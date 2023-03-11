import { useContext } from 'react';
import { authContext } from '../utils/authContext';

export function useAuthToken() {
  const value = useContext(authContext);

  return value.authToken;
}
