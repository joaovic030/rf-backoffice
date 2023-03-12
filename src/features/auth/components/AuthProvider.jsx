import { useState } from 'react';
import { authContext } from '../utils/authContext';
import { Header } from '../../shared/components/Header';

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  console.warn("Debugg purposes: ", authToken);
  return (
    <authContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
