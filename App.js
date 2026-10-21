// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Accueil from './src/screens/Accueil';
import Criteres from './src/screens/Criteres';
import Propositions from './src/screens/Propositions';
import Programme from './src/screens/Programme';
import Formulaire from './src/screens/Formulaire'; 
import Confirmation from './src/screens/Confirmation';
import Suivi from './src/screens/Suivi';   

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Accueil"
        screenOptions={{
          headerStyle: { backgroundColor: '#C0392B' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen 
          name="Accueil" 
          component={Accueil} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Criteres" 
          component={Criteres} 
          options={{ title: 'Vos critères' }} 
        />
        <Stack.Screen 
          name="Propositions" 
          component={Propositions} 
          options={{ title: 'Nos propositions' }} 
        />
        <Stack.Screen name="Suivi" component={Suivi} options={{ title: 'Suivi de ma demande' }} />
        <Stack.Screen 
  name="Programme" 
  component={Programme} 
  options={{ title: 'Programme détaillé' }} 
/>
<Stack.Screen 
  name="Formulaire" 
  component={Formulaire} 
  options={{ title: 'Ma demande' }} 
/>
<Stack.Screen 
  name="Confirmation" 
  component={Confirmation} 
  options={{ headerShown: false }} 
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}