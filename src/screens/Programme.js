// src/screens/Programme.js
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config'; 

export default function Programme({ route, navigation }) {
  const { circuit, criteres } = route.params;
  
  // On stocke les éléments modifiables et le prix dans des states
  const [elements, setElements] = useState(circuit.elements || []);
  const [prix, setPrix] = useState(circuit.prix_estime || 0);
  const [loading, setLoading] = useState(false);

  // Fonction pour supprimer une activité
  const supprimerActivite = async (elementASupprimer) => {
    Alert.alert(
      "Supprimer l'activité",
      `Voulez-vous retirer "${elementASupprimer.activite_nom || 'cet élément'}" du programme ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              // 1. On filtre le tableau pour retirer l'élément
              const nouveauxElements = elements.filter(e => e.id !== elementASupprimer.id);
              
              // 2. On demande à l'API de recalculer le prix
              // 👇 On utilise API_URL et on ajoute un timeout de 30s
              const response = await axios.post(`${API_URL}/circuits/recalculer`, {
                elements: nouveauxElements,
                adultes: criteres.adultes,
                enfants: criteres.enfants,
                ages_enfants: criteres.ages_enfants
              }, {
                timeout: 30000
              });

              // 3. On met à jour l'écran
              setElements(nouveauxElements);
              setPrix(response.data.nouveau_prix);
            } catch (error) {
              console.error(error);
              Alert.alert('Erreur', 'Impossible de recalculer le prix');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContenu}>
        
        <View style={styles.header}>
          <Text style={styles.titre}>{circuit.nom}</Text>
          <Text style={styles.duree}>{circuit.duree_jours} jours — Rythme {circuit.rythme}</Text>
          <Text style={styles.description}>{circuit.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>📅 Personnalisez votre programme</Text>
          <Text style={styles.hintText}>Vous pouvez retirer les activités qui ne vous intéressent pas.</Text>
          
          {elements.map((el, index) => (
            <View key={index} style={styles.elementCard}>
              <View style={styles.elementHeader}>
                <Text style={styles.elementIcon}>
                  {el.type === 'activite' ? '🎯' : el.type === 'trajet' ? '🚐' : '☕'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.elementNom}>
                    {el.activite_nom || (el.type === 'trajet' ? 'Trajet' : el.type)}
                  </Text>
                  <Text style={styles.elementDuree}>Durée : {el.duree_min} min</Text>
                </View>
                
                {/* Bouton supprimer (uniquement pour les activités) */}
                {el.type === 'activite' && (
                  <TouchableOpacity onPress={() => supprimerActivite(el)} style={styles.btnSuppr}>
                    <Text style={styles.btnSupprTexte}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.prixContainer}>
          <Text style={styles.prixTitre}>💰 Détail du prix estimé</Text>
          <View style={styles.prixLigneTotal}>
            <Text style={styles.prixLabelTotal}>Total mis à jour</Text>
            <Text style={styles.prixValeurTotal}>{prix.toLocaleString('fr-FR')} Ar</Text>
          </View>
          <Text style={styles.prixMention}>
            Prix estimatif, sous réserve de disponibilité.
          </Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bouton}
          disabled={loading}
          onPress={() => navigation.navigate('Formulaire', { circuit: { ...circuit, elements, prix_estime: prix }, criteres })}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.boutonTexte}>Demander ce séjour</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContenu: { paddingBottom: 100 },
  header: { backgroundColor: 'white', padding: 20, marginBottom: 15 },
  titre: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  duree: { fontSize: 14, color: '#C0392B', fontWeight: 'bold', marginTop: 5 },
  description: { fontSize: 14, color: '#7f8c8d', marginTop: 10, lineHeight: 20 },
  section: { backgroundColor: 'white', padding: 20, marginBottom: 15 },
  sectionTitre: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 },
  hintText: { fontSize: 12, color: '#95A5A6', marginBottom: 15, fontStyle: 'italic' },
  elementCard: { borderBottomWidth: 1, borderBottomColor: '#ecf0f1', paddingVertical: 10 },
  elementHeader: { flexDirection: 'row', alignItems: 'center' },
  elementIcon: { fontSize: 24, marginRight: 15 },
  elementNom: { fontSize: 15, fontWeight: '600', color: '#2C3E50' },
  elementDuree: { fontSize: 12, color: '#95A5A6', marginTop: 2 },
  btnSuppr: { padding: 10 },
  btnSupprTexte: { fontSize: 18 },
  prixContainer: { backgroundColor: 'white', padding: 20, marginBottom: 15, borderTopWidth: 2, borderTopColor: '#C0392B' },
  prixTitre: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  prixLigneTotal: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#ecf0f1', paddingTop: 10 },
  prixLabelTotal: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  prixValeurTotal: { fontSize: 20, fontWeight: 'bold', color: '#C0392B' },
  prixMention: { fontSize: 11, color: '#95A5A6', fontStyle: 'italic', marginTop: 15, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderTopColor: '#ddd' },
  bouton: { backgroundColor: '#C0392B', padding: 18, borderRadius: 8, alignItems: 'center' },
  boutonTexte: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});