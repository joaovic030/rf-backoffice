import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export function useDeletePlayer() {
  const navigate = useNavigate();

  const [player, { data, loading, error }] = useMutation(DELETE_PLAYER_MUTATION, {
    onCompleted: (data) => {
      navigate("/players");
      alert(`Player ${data.deletePlayer.name} deleted successfully!`);
    },
  });

  return player;
}

const DELETE_PLAYER_MUTATION = gql`
  mutation DeletePlayerMutation($id: ID!){
    deletePlayer(
        id: $id
    ) {
        id
        name
    }
  }
`;
