// src/screens/Suivi.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config'; 

export default function Suivi() {
  const [reference, setReference] = useState('');
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(false);

  const chercherDemande = async () => {
    if (!reference) {
      Alert.alert('Erreur', 'Entrez votre référence');
      return;
    }

    try {
      setLoading(true);
      // 👇 2. On utilise API_URL (Render) et on ajoute un timeout de 30s
      const response = await axios.get(`${API_URL}/demandes/suivi/ref/${reference.trim()}`, {
        timeout: 30000
      });
      setDemande(response.data);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.error || 'Référence introuvable ou erreur serveur';
      Alert.alert('Erreur', msg);
      setDemande(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Suivre ma demande</Text>
      <Text style={styles.sousTitre}>Entrez la référence reçue lors de l'envoi (ex: DEM-XXXXXX)</Text>

      <TextInput
        style={styles.input}
        value={reference}
        onChangeText={setReference}
        placeholder="DEM-XXXXXX"
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.bouton} onPress={chercherDemande} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.boutonTexte}>Rechercher</Text>
        )}
      </TouchableOpacity>

      {demande && (
        <View style={styles.resultat}>
          <Text style={styles.refText}>{demande.reference}</Text>
          <Text style={styles.statutText}>Statut : {demande.statut_libelle}</Text>
          <Text style={styles.infoText}>Client : {demande.nom_client}</Text>
          <Text style={styles.infoText}>Destination : {demande.destination_nom}</Text>
          <Text style={styles.mention}>Votre demande n'est pas encore une réservation confirmée.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, justifyContent: 'center' },
  titre: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 5 },
  sousTitre: { fontSize: 14, color: '#7f8c8d', marginBottom: 20 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  bouton: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20, height: 50, justifyContent: 'center' },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resultat: { backgroundColor: 'white', padding: 20, borderRadius: 8, marginTop: 30, borderLeftWidth: 4, borderLeftColor: '#27AE60' },
  refText: { fontSize: 20, fontWeight: 'bold', color: '#C0392B', marginBottom: 10 },
  statutText: { fontSize: 16, fontWeight: 'bold', color: '#27AE60', marginBottom: 10 },
  infoText: { fontSize: 14, color: '#2C3E50', marginBottom: 5 },
  mention: { fontSize: 11, color: '#95A5A6', fontStyle: 'italic', marginTop: 15 }
});