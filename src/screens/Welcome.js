// src/screens/Welcome.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titre}>SHAMS TOUR</Text>
        <Text style={styles.slogan}>L'art de voyager, émotion de découvrir.</Text>
      </View>

      <View style={styles.contenu}>
        <Text style={styles.message}>
          Préparez votre séjour à Majunga en quelques minutes.
        </Text>
      </View>

      <View style={styles.footer}>
        {/* Bouton pour ceux qui veulent un compte */}
        <TouchableOpacity 
          style={styles.boutonPrimaire}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.boutonTexte}>Se connecter / S'inscrire</Text>
        </TouchableOpacity>

        {/* Bouton pour ceux qui ne veulent pas de compte (CDC Section 3) */}
        <TouchableOpacity 
          style={styles.boutonSecondaire}
          onPress={() => navigation.navigate('Accueil')}
        >
          <Text style={styles.boutonTexteSecondaire}>Continuer sans compte (Visiteur)</Text>
        </TouchableOpacity>

        <Text style={styles.mention}>
          Aucun paiement en ligne.{'\n'}
          Vous serez rappelé pour confirmer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
    backgroundColor: '#C0392B', 
    padding: 40, 
    paddingTop: 80,
    alignItems: 'center' 
  },
  titre: { fontSize: 32, fontWeight: 'bold', color: 'white', letterSpacing: 2 },
  slogan: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginTop: 10 },
  contenu: { flex: 1, justifyContent: 'center', padding: 30 },
  message: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center' },
  footer: { padding: 30, paddingBottom: 50 },
  boutonPrimaire: { 
    backgroundColor: '#C0392B', 
    padding: 18, 
    borderRadius: 8, 
    alignItems: 'center',
    marginBottom: 15
  },
  boutonTexte: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  boutonSecondaire: { 
    backgroundColor: 'white', 
    padding: 18, 
    borderRadius: 8, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0392B',
    marginBottom: 30
  },
  boutonTexteSecondaire: { color: '#C0392B', fontSize: 16, fontWeight: 'bold' },
  mention: { fontSize: 12, color: '#7f8c8d', textAlign: 'center', lineHeight: 18 }
});