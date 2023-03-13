import { gql, useQuery } from '@apollo/client';

export function useTeamsQuery() {
  const { data, loading, error, refetch } = useQuery(TEAMS_QUERY);

  return { data, loading, error, refetch };
}

const TEAMS_QUERY = gql`
  query TeamsQuery{
    teams {
      nodes {
        id
        name
        acronym
      }
    }
  }
`;
