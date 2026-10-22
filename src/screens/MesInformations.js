// src/screens/MesInformations.js
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function MesInformations({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titre}>Mon Profil</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Prénom :</Text>
          <Text style={styles.valeur}>{user.prenom}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.valeur}>{user.nom}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.valeur}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sexe :</Text>
          <Text style={styles.valeur}>{user.sexe || 'Non renseigné'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Mot de passe :</Text>
          <Text style={styles.valeur}>••••••••</Text>
        </View>

        <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate('ModifierProfil')}>
          <Text style={styles.boutonTexte}>Modifier mes informations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3 },
  titre: { fontSize: 22, fontWeight: 'bold', color: '#C0392B', marginBottom: 20, textAlign: 'center' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ecf0f1', paddingVertical: 12 },
  label: { fontSize: 14, color: '#7f8c8d', fontWeight: '600' },
  valeur: { fontSize: 14, color: '#2C3E50', fontWeight: 'bold' },
  bouton: { backgroundColor: '#3498DB', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});