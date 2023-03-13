import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export function useUpdatePlayer() {
  const navigate = useNavigate();

  const [player, { data, loading, error }] = useMutation(UPDATE_PLAYER_MUTATION, {
    onCompleted: (data) => {
      alert(`Player ${data.updatePlayer.name} updated successfully!`);
    },
  });

  return player;
}

const UPDATE_PLAYER_MUTATION = gql`
  mutation UpdatePlayerMutation($id: ID!, $name: String!, $position: String!, $number: Int, $nationality: String, $age: Int, $team_id: Int){
    updatePlayer(
        id: $id,
        name: $name,
        position: $position,
        number: $number, 
        nationality: $nationality,
        age: $age,
        teamId: $team_id
    ) {
        id
        name
        position
        number
        nationality
        age
        team {
          name
        }
    }
  }
`;
