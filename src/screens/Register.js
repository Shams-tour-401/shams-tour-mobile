import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function Register({ navigation }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', mot_de_passe: '', sexe: 'Homme' });

  const sInscrire = async () => {
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      Alert.alert('Succès', 'Compte créé !');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Erreur');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <TextInput style={styles.input} placeholder="Nom" onChangeText={t => setForm({...form, nom: t})} />
      <TextInput style={styles.input} placeholder="Prénom" onChangeText={t => setForm({...form, prenom: t})} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={t => setForm({...form, email: t})} />
      
      <View style={styles.row}>
        {['Homme', 'Femme'].map(s => (
          <TouchableOpacity key={s} style={[styles.tag, form.sexe === s && styles.tagActif]} onPress={() => setForm({...form, sexe: s})}>
            <Text style={[styles.tagTexte, form.sexe === s && styles.tagTexteActif]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry onChangeText={t => setForm({...form, mot_de_passe: t})} />
      <TouchableOpacity style={styles.bouton} onPress={sInscrire}>
        <Text style={styles.boutonTexte}>S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  tag: { padding: 15, flex: 1, backgroundColor: 'white', borderRadius: 8, alignItems: 'center' },
  tagActif: { backgroundColor: '#C0392B' },
  tagTexte: { color: '#2C3E50' },
  tagTexteActif: { color: 'white' },
  bouton: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center' },
  boutonTexte: { color: 'white', fontWeight: 'bold' }
});