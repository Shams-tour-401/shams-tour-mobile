// src/screens/Login.js
import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// Assurez-vous d'avoir votre fichier config.js avec l'IP
import { API_URL } from '../config'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);
  
  // On récupère la fonction login du contexte
  const { login } = useContext(AuthContext);

  const seConnecter = async () => {
    if (!email || !motDePasse) {
      return Alert.alert('Erreur', 'Remplissez tous les champs');
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, { 
        identifiant: email, 
        mot_de_passe: motDePasse 
      });
      
      // On sauvegarde les données du client via le contexte
      await login(response.data.utilisateur, response.data.token);
      
      // On le redirige vers l'accueil
      navigation.navigate('Accueil');
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titre}>Connexion</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
          autoCapitalize="none" 
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Mot de passe" 
          value={motDePasse} 
          onChangeText={setMotDePasse} 
          secureTextEntry 
        />
        
        <TouchableOpacity style={styles.bouton} onPress={seConnecter} disabled={loading}>
          <Text style={styles.boutonTexte}>{loading ? 'Connexion...' : 'Se connecter'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.lienContainer}>
          <Text style={styles.lien}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.lienContainer}>
          <Text style={styles.lien}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 10, elevation: 3 },
  titre: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#C0392B' },
  input: { 
    backgroundColor: '#f9f9f9', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  bouton: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  lienContainer: { marginTop: 15, alignItems: 'center' },
  lien: { color: '#3498DB', fontSize: 14, fontWeight: '600' }
});