// src/screens/ModifierProfil.js
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

export default function ModifierProfil({ navigation }) {
  const { user, login } = useContext(AuthContext);
  
  const [nom, setNom] = useState(user?.nom || '');
  const [prenom, setPrenom] = useState(user?.prenom || '');
  const [email, setEmail] = useState(user?.email || '');
  const [sexe, setSexe] = useState(user?.sexe || 'Homme');

  const sauvegarder = async () => {
    try {
      const token = await AsyncStorage.getItem('@shams_token');
      
      await axios.put(`${API_URL}/auth/profil`, 
        { nom, prenom, email, sexe },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await login({ ...user, nom, prenom, email, sexe }, token); 
      Alert.alert('Succès', 'Profil mis à jour !');
      navigation.goBack(); // Retourne à l'écran "Mes informations"
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Erreur');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Prénom</Text>
      <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} />
      
      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} value={nom} onChangeText={setNom} />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Sexe</Text>
      <View style={styles.row}>
        {['Homme', 'Femme'].map(s => (
          <TouchableOpacity key={s} style={[styles.tag, sexe === s && styles.tagActif]} onPress={() => setSexe(s)}>
            <Text style={[styles.tagTexte, sexe === s && styles.tagTexteActif]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.bouton} onPress={sauvegarder}>
        <Text style={styles.boutonTexte}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  tag: { flex: 1, padding: 12, backgroundColor: 'white', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  tagActif: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  tagTexte: { color: '#2C3E50' },
  tagTexteActif: { color: 'white', fontWeight: 'bold' },
  bouton: { backgroundColor: '#27AE60', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});