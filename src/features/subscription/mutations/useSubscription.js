import { gql, useMutation } from '@apollo/client';
import { authContext } from '../../auth/utils/authContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export function useActivateSubscription() {
  const { setAuthToken } = useContext(authContext);

  const [activeSubscription, { data, loading, error }] = useMutation(ACTIVATE_SUBSCRIPTION, {
    onCompleted: (data) => {
      console.log("User subscribed to player!", data.activeSubscription.playerId);
    },
  });

  return activeSubscription;
}

export function useCancelSubscription() {
  const { setAuthToken } = useContext(authContext);

  const [cancelSubscription, { data, loading, error }] = useMutation(CANCEL_SUBSCRIPTION, {
    onCompleted: (data) => {
      console.log("User unsubscribed from player!", data.activeSubscription.playerId);
    },
  });

  return cancelSubscription;
}

const ACTIVATE_SUBSCRIPTION = gql`
  mutation ActivateSubscriptionMutation($playerId: Int!){
    activateSubscription(
      playerId: $playerId
    )
    {
      playerId,
      userSubscribed {
        id
        name
        email
      }
    }
  }
`;

const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscriptionMutation($playerId: Int!){
    cancelSubscription(
      playerId: $playerId
    )
    {
      playerId,
      userSubscribed {
        id
        name
        email
      }
    }
  }
`
