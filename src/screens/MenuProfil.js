// src/screens/MenuProfil.js
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function MenuProfil({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const seDeconnecter = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Oui", onPress: async () => {
          await logout();
          navigation.navigate('Welcome');
        } 
      }
    ]);
  };

  // Si l'utilisateur n'est pas connecté, on l'invite à le faire
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.vide}>Vous n'êtes pas connecté.</Text>
        <TouchableOpacity style={styles.btnConnect} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.nom}>{user.prenom} {user.nom}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        {/* 1. Mes informations */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MesInformations')}>
          <Text style={styles.menuIcon}>📋</Text>
          <Text style={styles.menuText}>Mes informations</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        {/* 2. Paramètres du compte */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ParametresCompte')}>
          <Text style={styles.menuIcon}>🔒</Text>
          <Text style={styles.menuText}>Paramètres du compte</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        {/* 3. Déconnexion */}
        <TouchableOpacity style={styles.menuItem} onPress={seDeconnecter}>
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={[styles.menuText, { color: '#E74C3C' }]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  avatar: { fontSize: 60, marginBottom: 10 },
  nom: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  email: { fontSize: 14, color: '#7f8c8d' },
  menu: { backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', elevation: 3 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ecf0f1' },
  menuIcon: { fontSize: 20, marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  menuArrow: { fontSize: 18, color: '#95A5A6' },
  vide: { textAlign: 'center', marginBottom: 20, color: '#7f8c8d' },
  btnConnect: { backgroundColor: '#C0392B', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});