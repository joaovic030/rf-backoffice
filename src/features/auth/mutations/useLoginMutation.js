import { gql, useMutation } from '@apollo/client';
import { authContext } from '../utils/authContext';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export function useLoginMutation() {
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("Data from userSignIn:", data.signinUser);
      setUser(data.signinUser.user);
      navigate("/players");
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
