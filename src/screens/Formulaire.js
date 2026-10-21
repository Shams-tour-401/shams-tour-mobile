// src/screens/Formulaire.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Alert } from 'react-native';
import axios from 'axios';

// 1. ON MET LA VRAIE IP ICI
const API_URL = 'http://192.168.1.99:3000/api'; 

export default function Formulaire({ route, navigation }) {
  const { circuit, criteres } = route.params;
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [creneau, setCreneau] = useState('matin');
  const [commentaire, setCommentaire] = useState('');
  const [accepte, setAccepte] = useState(false);
  const [loading, setLoading] = useState(false);

  const envoyerDemande = async () => {
    if (!nom || !telephone || !accepte) {
      Alert.alert('Erreur', 'Remplissez tous les champs et acceptez la notice.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        destination_id: 1,
        date_depart: criteres.date_depart || '2026-12-15', // Sécurité si la date est vide
        nombre_jours: parseInt(criteres.nombre_jours) || 2,
        adultes: parseInt(criteres.adultes) || 2,
        enfants: parseInt(criteres.enfants) || 0,
        ages_enfants: criteres.ages_enfants || [],
        profil: criteres.profil,
        envies: criteres.envies,
        rythme: criteres.rythme,
        budget: criteres.budget,
        budget_type: criteres.budget_type,
        nom_client: nom,
        telephone: telephone,
        creneau_rappel: creneau,
        commentaire: commentaire,
        cle_envoi: Date.now().toString()
      };

      const response = await axios.post(`${API_URL}/demandes`, payload);
      navigation.replace('Confirmation', { demande: response.data });
    } catch (error) {
      console.error(error);
      // 2. ON AFFICHE LA VRAIE ERREUR DE L'API
      const msg = error.response?.data?.error || error.message;
      Alert.alert('Erreur', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenu}>
      <Text style={styles.titre}>Vos coordonnées</Text>
      
      {/* Petit rappel des dates pour rassurer le client */}
      <View style={styles.recap}>
        <Text style={styles.recapText}>Circuit : {circuit.nom}</Text>
        <Text style={styles.recapText}>Départ prévu : {criteres.date_depart}</Text>
      </View>

      <Text style={styles.label}>Nom complet *</Text>
      <TextInput style={styles.input} value={nom} onChangeText={setNom} />

      <Text style={styles.label}>Téléphone (avec indicatif) *</Text>
      <TextInput style={styles.input} value={telephone} onChangeText={setTelephone} keyboardType="phone-pad" placeholder="+261..." />

      <Text style={styles.label}>Créneau de rappel souhaité</Text>
      <View style={styles.tagsContainer}>
        {['matin', 'midi', 'apres-midi', 'soir'].map(c => (
          <TouchableOpacity key={c} style={[styles.tag, creneau === c && styles.tagActif]} onPress={() => setCreneau(c)}>
            <Text style={[styles.tagTexte, creneau === c && styles.tagTexteActif]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Commentaire (optionnel)</Text>
      <TextInput style={[styles.input, { height: 80 }]} value={commentaire} onChangeText={setCommentaire} multiline />

      <View style={styles.checkboxContainer}>
        <Switch value={accepte} onValueChange={setAccepte} />
        <Text style={styles.checkboxText}>J'ai pris connaissance de la notice de confidentialité.</Text>
      </View>

      <TouchableOpacity style={styles.bouton} onPress={envoyerDemande} disabled={loading}>
        <Text style={styles.boutonTexte}>{loading ? 'Envoi...' : 'Envoyer ma demande'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contenu: { padding: 20, paddingBottom: 50 },
  titre: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  recap: { backgroundColor: '#ECF0F1', padding: 15, borderRadius: 8, marginBottom: 10 },
  recapText: { fontSize: 13, color: '#2C3E50', marginBottom: 2 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 5 },
  tag: { padding: 8, paddingHorizontal: 12, borderRadius: 15, backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd' },
  tagActif: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  tagTexte: { fontSize: 12, color: '#2C3E50' },
  tagTexteActif: { color: 'white' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, gap: 10 },
  checkboxText: { flex: 1, fontSize: 12, color: '#7f8c8d' },
  bouton: { backgroundColor: '#C0392B', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  boutonTexte: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});