import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  const seConnecter = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { identifiant: email, mot_de_passe: mdp });
      Alert.alert('Succès', `Bienvenue ${res.data.utilisateur.prenom} !`);
      navigation.navigate('Accueil'); // Aller à l'accueil après connexion
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Connexion échouée');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={mdp} onChangeText={setMdp} secureTextEntry />
      
      <TouchableOpacity style={styles.bouton} onPress={seConnecter}>
        <Text style={styles.boutonTexte}>Se connecter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.lien}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.lien}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  titre: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#C0392B' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 15 },
  bouton: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center' },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  lien: { textAlign: 'center', color: '#3498DB', marginTop: 15 }
});