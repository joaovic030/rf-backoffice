import { gql, useQuery } from '@apollo/client';

export function usePlayersQuery(variables) {
  const { data, loading, error, refetch } = useQuery(PLAYERS_QUERY, {
    variables: variables
  });

  return { data, loading, error, refetch };
}

const PLAYERS_QUERY = gql`
  query PlayersQuery($orderBy: OrderBy, $skip: Int, $limit: Int){
    players(orderBy: $orderBy, skip: $skip, limit: $limit) {
      nodes {
        id
        name
        position
        number
        nationality
        age
        team {
          id
          name
        }
      }
    }
  }
`;
