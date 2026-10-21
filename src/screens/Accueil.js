// src/screens/Accueil.js
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Accueil({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titre}>SHAMS TOUR</Text>
        <Text style={styles.slogan}>L'art de voyager, émotion de découvrir.</Text>
      </View>

      <View style={styles.contenu}>
        <Text style={styles.message}>
          Découvrez Majunga avec ceux qui la connaissent le mieux.
        </Text>
        <Text style={styles.sousMessage}>
          Préparez votre séjour sur mesure en quelques minutes.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bouton}
          onPress={() => navigation.navigate('Criteres')}
        >
          <Text style={styles.boutonTexte}>Commencer la préparation</Text>
          
        </TouchableOpacity>
        
         <TouchableOpacity 
          onPress={() => navigation.navigate('Suivi')} 
          style={{ marginTop: 15, marginBottom: 20, alignItems: 'center' }}
        >
          <Text style={{ color: '#7f8c8d', fontSize: 14 }}>
            J'ai déjà une demande, la suivre →
          </Text>
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
  titre: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white', 
    letterSpacing: 2 
  },
  slogan: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.8)', 
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center'
  },
  contenu: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30 
  },
  message: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    textAlign: 'center',
    marginBottom: 15
  },
  sousMessage: { 
    fontSize: 16, 
    color: '#7f8c8d', 
    textAlign: 'center' 
  },
  footer: { 
    padding: 30, 
    paddingBottom: 50 
  },
  bouton: { 
    backgroundColor: '#C0392B', 
    padding: 18, 
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  boutonTexte: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  mention: { 
    fontSize: 12, 
    color: '#7f8c8d', 
    textAlign: 'center',
    lineHeight: 18
  }
});