import { useContext } from 'react';
import { authContext } from '../utils/authContext';

export function useUserProfile() {
  const value = useContext(authContext);

  return value.user;
}
