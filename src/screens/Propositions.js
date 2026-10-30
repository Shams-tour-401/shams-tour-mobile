// src/screens/Propositions.js
import { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, 
  StyleSheet, ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../config'; 

export default function Propositions({ route, navigation }) {
  const { criteres } = route.params;
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    rechercher();
  }, []);

  const rechercher = async () => {
    try {
      setLoading(true);
      // 👇 On utilise API_URL de config.js et on ajoute le timeout de 30s
      const response = await axios.post(`${API_URL}/circuits/recherche`, criteres, {
        timeout: 30000 
      });
      setCircuits(response.data.circuits || []);
    } catch (error) {
      console.error(error);
      setErreur('Erreur de connexion au serveur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color="#C0392B" />
        <Text style={styles.chargement}>Recherche des meilleurs circuits...</Text>
      </View>
    );
  }

  if (erreur) {
    return (
      <View style={styles.centre}>
        <Text style={styles.erreur}>{erreur}</Text>
        <TouchableOpacity 
          style={styles.boutonRetour}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.boutonTexte}>Modifier mes critères</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (circuits.length === 0) {
    return (
      <View style={styles.centre}>
        <Text style={styles.aucun}>Aucun circuit trouvé</Text>
        <TouchableOpacity 
          style={styles.boutonRetour}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.boutonTexte}>Modifier mes critères</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        {circuits.length} circuit(s) adapté(s) à vos envies
      </Text>

      <FlatList
        data={circuits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitre}>{item.nom}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            
            {/* LA RAISON (demandée par le CDC) */}
            <View style={styles.raisonBox}>
              <Text style={styles.raisonTexte}>💡 {item.raison}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardDuree}>{item.duree_jours} jours</Text>
              <Text style={styles.cardPrix}>{item.prix_estime.toLocaleString()} Ar</Text>
            </View>

            <TouchableOpacity style={styles.cardBouton} onPress={() => navigation.navigate('Programme', { circuit: item, criteres })}>
              <Text style={styles.cardBoutonTexte}>Voir le programme →</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
  centre: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  chargement: { marginTop: 15, color: '#7f8c8d' },
  erreur: { color: '#C0392B', fontSize: 16, marginBottom: 20 },
  aucun: { fontSize: 18, color: '#7f8c8d', marginBottom: 20 },
  titre: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 15 
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 20, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitre: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2C3E50', 
    marginBottom: 8 
  },
  cardDesc: { 
    fontSize: 14, 
    color: '#7f8c8d', 
    marginBottom: 12,
    lineHeight: 20
  },
  cardInfo: { 
    flexDirection: 'row', 
    gap: 10, 
    marginBottom: 15 
  },
  cardDuree: { 
    backgroundColor: '#ECF0F1', 
    paddingHorizontal: 12, 
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600'
  },
  cardBouton: { 
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    alignItems: 'flex-end'
  },
  cardBoutonTexte: { 
    color: '#C0392B', 
    fontWeight: '600',
    fontSize: 14
  },
  boutonRetour: { 
    backgroundColor: '#C0392B', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8 
  },
  boutonTexte: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  raisonBox: { backgroundColor: '#FEF5E7', padding: 10, borderRadius: 8, marginBottom: 10 },
  raisonTexte: { color: '#E67E22', fontSize: 12, fontStyle: 'italic' },
  cardPrix: { color: '#C0392B', fontWeight: 'bold', fontSize: 16 },
});