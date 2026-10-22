// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import du contexte d'authentification
import { AuthProvider } from './src/context/AuthContext';

// Import de tous vos écrans
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import Accueil from './src/screens/Accueil';
import Criteres from './src/screens/Criteres';
import Propositions from './src/screens/Propositions';
import Programme from './src/screens/Programme';
import Formulaire from './src/screens/Formulaire'; 
import Confirmation from './src/screens/Confirmation';
import Suivi from './src/screens/Suivi';  

// --- NOUVEAUX ÉCRANS POUR LE COMPTE CLIENT ---
import MenuProfil from './src/screens/MenuProfil';
import MesInformations from './src/screens/MesInformations';
import ModifierProfil from './src/screens/ModifierProfil';
import ParametresCompte from './src/screens/ParametresCompte';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: { backgroundColor: '#C0392B' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          {/* --- ÉCRANS D'AUTHENTIFICATION --- */}
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Connexion' }} />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Inscription' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Mot de passe oublié' }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Nouveau mot de passe' }} />

          {/* --- PARCOURS VOYAGEUR --- */}
          <Stack.Screen name="Accueil" component={Accueil} options={{ title: 'Shams Tour' }} />
          <Stack.Screen name="Criteres" component={Criteres} options={{ title: 'Vos critères' }} />
          <Stack.Screen name="Propositions" component={Propositions} options={{ title: 'Nos propositions' }} />
          <Stack.Screen name="Programme" component={Programme} options={{ title: 'Programme détaillé' }} />
          <Stack.Screen name="Formulaire" component={Formulaire} options={{ title: 'Ma demande' }} />
          <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
          <Stack.Screen name="Suivi" component={Suivi} options={{ title: 'Suivi de ma demande' }} />
          
          {/* --- ESPACE CLIENT (NOUVEAU MENU) --- */}
          <Stack.Screen name="MenuProfil" component={MenuProfil} options={{ title: 'Mon Compte' }} />
          <Stack.Screen name="MesInformations" component={MesInformations} options={{ title: 'Mes informations' }} />
          <Stack.Screen name="ModifierProfil" component={ModifierProfil} options={{ title: 'Modifier mes infos' }} />
          <Stack.Screen name="ParametresCompte" component={ParametresCompte} options={{ title: 'Sécurité' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}