import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export function useCreatePlayer() {
  const navigate = useNavigate();

  const [player, { data, loading, error }] = useMutation(CREATE_PLAYER_MUTATION, {
    onCompleted: (data) => {
      if (!error) alert(`Player ${data.createPlayer.name} created successfully!`);
      
      if(!error) navigate("/players");
    },
  });

  return player;
}

const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayerMutation($name: String!, $position: String!, $number: Int, $nationality: String, $age: Int, $teamId: Int){
    createPlayer(
        name: $name,
        position: $position,
        number: $number, 
        nationality: $nationality,
        age: $age,
        teamId: $teamId
    ) {
        id
        name
    }
  }
`;
