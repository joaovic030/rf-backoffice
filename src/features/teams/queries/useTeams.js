import { gql, useQuery } from '@apollo/client';

export function useTeamsQuery() {
  const { data, loading } = useQuery(TEAMS_QUERY);

  return { data, loading };
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
