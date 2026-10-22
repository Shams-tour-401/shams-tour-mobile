import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function ResetPassword({ route, navigation }) {
  const { email } = route.params;
  const [pin, setPin] = useState('');
  const [mdp, setMdp] = useState('');

  const reinitialiser = async () => {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { email, code_pin: pin, nouveau_mot_de_passe: mdp });
      Alert.alert('Succès', 'Mot de passe changé !');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Erreur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Nouveau mot de passe</Text>
      <TextInput style={styles.input} placeholder="Code PIN (6 chiffres)" keyboardType="numeric" maxLength={6} onChangeText={setPin} />
      <TextInput style={styles.input} placeholder="Nouveau mot de passe" secureTextEntry onChangeText={setMdp} />
      <TouchableOpacity style={styles.bouton} onPress={reinitialiser}>
        <Text style={styles.boutonTexte}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  titre: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15 },
  bouton: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center' },
  boutonTexte: { color: 'white', fontWeight: 'bold' }
});