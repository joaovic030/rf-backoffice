import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export function useCreatePlayer() {
  const navigate = useNavigate();

  const [player, { data, loading, error }] = useMutation(CREATE_PLAYER_MUTATION, {
    onCompleted: (data) => {
      alert(`Player ${data.createPlayer.name} created successfully!`);
      navigate("/players");
    },
  });

  return player;
}

const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayerMutation($name: String!, $position: String!, $number: Int, $nationality: String, $age: Int, $team_id: Int){
    createPlayer(
        name: $name,
        position: $position,
        number: $number, 
        nationality: $nationality,
        age: $age,
        team_id: $team_id
    ) {
        id
    }
  }
`;
