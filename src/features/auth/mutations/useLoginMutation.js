import { gql, useMutation } from '@apollo/client';
import { authContext } from '../utils/authContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export function useLoginMutation() {
  const { setAuthToken } = useContext(authContext);

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("Data from userSignIn:", data.signinUser);
      setAuthToken(data.signinUser.token);
    },
  });

  return login;
}

const LOGIN_MUTATION = gql`
  mutation SignInUser($credentials: AUTH_PROVIDER_CREDENTIALS) {
    signinUser(
        credentials: $credentials
    ) {
        token
        user {
            id
            email
            name
        }
    }
  }
`;
