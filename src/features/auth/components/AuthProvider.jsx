import { useState } from 'react';
import { authContext } from '../utils/authContext';
import { Header } from '../../shared/components/Header';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
