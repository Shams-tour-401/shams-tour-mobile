// src/screens/Criteres.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';

const ENVIES = ['nature', 'aventure', 'culture'];
const RYTHMES = ['detente', 'equilibre', 'intense'];
const PROFILS = ['seul', 'couple', 'famille', 'amis'];

export default function Criteres({ navigation }) {
  const [dateDepart, setDateDepart] = useState('2026-12-15');
  const [nombreJours, setNombreJours] = useState('2');
  const [adultes, setAdultes] = useState('2');
  const [enfants, setEnfants] = useState('0');
  const [agesEnfants, setAgesEnfants] = useState('');
  const [profil, setProfil] = useState('famille');
  const [envies, setEnvies] = useState([]);
  const [rythme, setRythme] = useState('equilibre');
  const [budget, setBudget] = useState('');
  const [budgetType, setBudgetType] = useState('total_groupe'); // ou par_personne

  const toggleEnvie = (envie) => {
    if (envies.includes(envie)) setEnvies(envies.filter(e => e !== envie));
    else setEnvies([...envies, envie]);
  };

  const rechercher = () => {
    const criteres = {
      destination_id: 1,
      date_depart: dateDepart,
      nombre_jours: parseInt(nombreJours),
      adultes: parseInt(adultes),
      enfants: parseInt(enfants),
      ages_enfants: agesEnfants.split(',').map(a => parseInt(a.trim())).filter(a => !isNaN(a)),
      profil,
      envies,
      rythme,
      budget: budget ? parseInt(budget) : null,
      budget_type: budgetType
    };
    navigation.navigate('Propositions', { criteres });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenu}>
      
      <Text style={styles.label}>Date de départ</Text>
      <TextInput style={styles.input} value={dateDepart} onChangeText={setDateDepart} placeholder="AAAA-MM-JJ" />

      <Text style={styles.label}>Nombre de jours</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={nombreJours} onChangeText={setNombreJours} />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Adultes</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={adultes} onChangeText={setAdultes} />
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Enfants</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={enfants} onChangeText={setEnfants} />
        </View>
      </View>

      {parseInt(enfants) > 0 && (
        <>
          <Text style={styles.label}>Âges des enfants (séparés par virgule)</Text>
          <TextInput style={styles.input} value={agesEnfants} onChangeText={setAgesEnfants} placeholder="Ex: 6, 10" />
        </>
      )}

      <Text style={styles.label}>Profil</Text>
      <View style={styles.tagsContainer}>
        {PROFILS.map(p => (
          <TouchableOpacity key={p} style={[styles.tag, profil === p && styles.tagActif]} onPress={() => setProfil(p)}>
            <Text style={[styles.tagTexte, profil === p && styles.tagTexteActif]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Envies</Text>
      <View style={styles.tagsContainer}>
        {ENVIES.map(e => (
          <TouchableOpacity key={e} style={[styles.tag, envies.includes(e) && styles.tagActif]} onPress={() => toggleEnvie(e)}>
            <Text style={[styles.tagTexte, envies.includes(e) && styles.tagTexteActif]}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Rythme</Text>
      <View style={styles.tagsContainer}>
        {RYTHMES.map(r => (
          <TouchableOpacity key={r} style={[styles.tag, rythme === r && styles.tagActif]} onPress={() => setRythme(r)}>
            <Text style={[styles.tagTexte, rythme === r && styles.tagTexteActif]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Budget (Ar) - Optionnel</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={budget} onChangeText={setBudget} placeholder="Ex: 500000" />
      
      {budget !== '' && (
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Total groupe</Text>
          <Switch value={budgetType === 'par_personne'} onValueChange={(val) => setBudgetType(val ? 'par_personne' : 'total_groupe')} />
          <Text style={styles.switchText}>Par personne</Text>
        </View>
      )}

      <TouchableOpacity style={styles.bouton} onPress={rechercher}>
        <Text style={styles.boutonTexte}>Voir les propositions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contenu: { padding: 20, paddingBottom: 50 },
  label: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row', gap: 10 },
  col: { flex: 1 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  tag: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd' },
  tagActif: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  tagTexte: { color: '#2C3E50', fontWeight: '600', textTransform: 'capitalize' },
  tagTexteActif: { color: 'white' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, gap: 10 },
  switchText: { fontSize: 12, color: '#7f8c8d' },
  bouton: { backgroundColor: '#C0392B', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  boutonTexte: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});