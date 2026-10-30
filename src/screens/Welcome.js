// src/screens/Welcome.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BLEU_CIEL = '#A9DDF1';
const BLEU_CARTE = '#6FB9DD';
const ORANGE = '#FFA800';
const TEXTE = '#2C3E50';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      {/* En-tête bleu ciel */}
      <View style={styles.header}>
        <View style={styles.barreHaut}>
          <View style={styles.burger}>
            <View style={[styles.burgerLigne, { width: 22 }]} />
            <View style={[styles.burgerLigne, { width: 22 }]} />
            <View style={[styles.burgerLigne, { width: 14 }]} />
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        <View style={styles.salutation}>
          <View>
            <Text style={styles.bonjour}>Bienvenue sur</Text>
            <Text style={styles.titre}>SHAMS TOUR</Text>
            <Text style={styles.slogan}>L'art de voyager, émotion de découvrir.</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcone}>🧳</Text>
          </View>
        </View>

        {/* Fausse barre de recherche (comme sur la maquette) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.recherche}
          onPress={() => navigation.navigate('Accueil')}
        >
          <Text style={styles.rechercheTexte}>Rechercher un séjour à Majunga</Text>
          <Text style={styles.rechercheIcone}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Panneau blanc à coins arrondis */}
      <View style={styles.panneau}>
        <Text style={styles.question}>Que souhaitez-vous faire ?</Text>
        <Text style={styles.sousQuestion}>
          Préparez votre séjour à Majunga en quelques minutes
        </Text>

        {/* Carte orange : compte */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.carte, { backgroundColor: ORANGE }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.carteTitre}>Se connecter{'\n'}/ S'inscrire</Text>
          <Text style={styles.carteDeco}>🌴</Text>
        </TouchableOpacity>

        {/* Carte bleue : visiteur (CDC Section 3) */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.carte, { backgroundColor: BLEU_CARTE }]}
          onPress={() => navigation.navigate('Accueil')}
        >
          <Text style={styles.carteTitre}>Continuer sans{'\n'}compte (Visiteur)</Text>
          <Text style={styles.carteDeco}>✈️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.boutonPilule}
          onPress={() => navigation.navigate('Accueil')}
        >
          <Text style={styles.boutonTexte}>PLANIFIER UN SÉJOUR</Text>
        </TouchableOpacity>

        <Text style={styles.mention}>
          Aucun paiement en ligne.{'\n'}
          Vous serez rappelé pour confirmer.
        </Text>
      </View>
    </View>
  );
}

const ombre = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 6,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLEU_CIEL },

  header: { paddingTop: 55, paddingHorizontal: 24, paddingBottom: 50 },
  barreHaut: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  burger: { gap: 4 },
  burgerLigne: { height: 3, borderRadius: 2, backgroundColor: 'white' },
  chevron: { fontSize: 32, color: 'white', lineHeight: 32 },

  salutation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  bonjour: { fontSize: 13, color: 'white' },
  titre: { fontSize: 26, fontWeight: 'bold', color: 'white', letterSpacing: 1.5 },
  slogan: { fontSize: 11, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginTop: 2 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...ombre,
  },
  avatarIcone: { fontSize: 26 },

  recherche: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 22,
    ...ombre,
  },
  rechercheTexte: { fontSize: 13, color: '#9aa5ad' },
  rechercheIcone: { fontSize: 14 },

  panneau: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 30,
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },
  question: { fontSize: 15, fontWeight: 'bold', color: ORANGE },
  sousQuestion: { fontSize: 11, color: TEXTE, marginTop: 4, marginBottom: 20, textAlign: 'center' },

  carte: {
    width: '100%',
    height: 90,
    borderRadius: 18,
    paddingHorizontal: 20,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...ombre,
  },
  carteTitre: { fontSize: 17, fontWeight: '600', color: 'white', lineHeight: 22 },
  carteDeco: { fontSize: 48 },

  boutonPilule: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 30,
    marginTop: 6,
    ...ombre,
    shadowColor: ORANGE,
  },
  boutonTexte: { color: 'white', fontSize: 13, fontWeight: 'bold', letterSpacing: 1 },

  mention: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 'auto',
  },
});