// src/screens/ParametresCompte.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ParametresCompte() {
  const [ancienMdp, setAncienMdp] = useState('');
  const [nouveauMdp, setNouveauMdp] = useState('');

  const changerMotDePasse = async () => {
    if (!ancienMdp || !nouveauMdp) {
      return Alert.alert('Erreur', 'Remplissez tous les champs');
    }
    try {
      const token = await AsyncStorage.getItem('@shams_token');
      await axios.put(`${API_URL}/auth/change-password`, 
        { ancien_mot_de_passe: ancienMdp, nouveau_mot_de_passe: nouveauMdp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Succès', 'Mot de passe modifié !');
      setAncienMdp('');
      setNouveauMdp('');
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Erreur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ancien mot de passe</Text>
      <TextInput style={styles.input} value={ancienMdp} onChangeText={setAncienMdp} secureTextEntry />
      
      <Text style={styles.label}>Nouveau mot de passe</Text>
      <TextInput style={styles.input} value={nouveauMdp} onChangeText={setNouveauMdp} secureTextEntry />

      <TouchableOpacity style={styles.bouton} onPress={changerMotDePasse}>
        <Text style={styles.boutonTexte}>Enregistrer le nouveau mot de passe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 20 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  bouton: { backgroundColor: '#3498DB', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});