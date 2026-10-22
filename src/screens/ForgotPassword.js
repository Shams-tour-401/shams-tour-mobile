import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const envoyerPin = async () => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      Alert.alert('Succès', 'Vérifiez votre boîte mail !');
      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Erreur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Mot de passe oublié</Text>
      <TextInput style={styles.input} placeholder="Votre email" keyboardType="email-address" autoCapitalize="none" onChangeText={setEmail} />
      <TouchableOpacity style={styles.bouton} onPress={envoyerPin}>
        <Text style={styles.boutonTexte}>Recevoir le code</Text>
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