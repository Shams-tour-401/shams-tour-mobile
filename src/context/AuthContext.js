// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au démarrage, on vérifie s'il y a un utilisateur sauvegardé
  useEffect(() => {
    async function loadStorageData() {
      const storedToken = await AsyncStorage.getItem('@shams_token');
      const storedUser = await AsyncStorage.getItem('@shams_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const login = async (dados, tokenJwt) => {
    setUser(dados);
    setToken(tokenJwt);
    await AsyncStorage.setItem('@shams_user', JSON.stringify(dados));
    await AsyncStorage.setItem('@shams_token', tokenJwt);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('@shams_user');
    await AsyncStorage.removeItem('@shams_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}