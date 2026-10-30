// src/screens/Confirmation.js
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { API_URL } from '../config'; // 👈 On importe l'URL de Render

export default function Confirmation({ route, navigation }) {
  const { demande } = route.params;

  const partagerLien = () => {
    // 👇 On utilise l'URL de Render pour le lien de suivi
    Share.share({
      message: `Suivez votre demande Shams Tour ici : ${API_URL}/demandes/suivi/${demande.jeton_suivi}`
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.titre}>Demande envoyée !</Text>
      
      <Text style={styles.reference}>{demande.reference}</Text>
      
      <Text style={styles.mention}>
        Votre demande n'est pas une réservation confirmée. Notre équipe vous contactera pour vérifier les disponibilités et confirmer votre voyage.
      </Text>

      <TouchableOpacity style={styles.boutonLien} onPress={partagerLien}>
        <Text style={styles.boutonLienTexte}>🔗 Partager mon lien de suivi</Text>
      </TouchableOpacity>

                    <TouchableOpacity 
        style={styles.bouton} 
        onPress={() => navigation.navigate('Accueil')}
      >
        <Text style={styles.boutonTexte}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#f5f5f5' },
  icon: { fontSize: 60, marginBottom: 20 },
  titre: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2C3E50' },
  reference: { fontSize: 20, fontWeight: 'bold', color: '#C0392B', backgroundColor: '#FADBD8', padding: 15, borderRadius: 8, marginBottom: 20 },
  mention: { textAlign: 'center', color: '#7f8c8d', lineHeight: 22, marginBottom: 30 },
  boutonLien: { backgroundColor: '#3498DB', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  boutonLienTexte: { color: 'white', fontWeight: 'bold' },
  bouton: { padding: 15, alignItems: 'center' },
  boutonTexte: { color: '#C0392B', fontWeight: 'bold' }
});