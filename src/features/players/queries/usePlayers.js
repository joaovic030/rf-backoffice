import { gql, useQuery } from '@apollo/client';

export function usePlayersQuery(variables) {
  const { data, loading, error } = useQuery(PLAYERS_QUERY, {
    variables: variables
  });

  return { data, loading, error };
}

const PLAYERS_QUERY = gql`
  query PlayersQuery($orderBy: OrderBy, $skip: Int, $limit: Int){
    players(orderBy: $orderBy, skip: $skip, limit: $limit) {
      nodes {
        id
        name
        position
        number
        age
        nationality
        subscribed
        team {
          id
          name
          acronym
        }
      }
    }
  }
`;
