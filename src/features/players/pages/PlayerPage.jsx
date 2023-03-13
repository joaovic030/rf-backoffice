import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserProfile } from '../../auth/hooks/useUserProfile';
import { Header } from '../../shared/components/Header';
import { useApolloClient } from '@apollo/client';
import { PlayerForm } from '../components/PlayerForm';

export function PlayerPage() {
  const userProfile = useUserProfile();
  const location = useLocation();

  const player = location.state?.player;
  
  const client = useApolloClient();

  // const handleRefetch = async () => {
  //   await players.refetch();

  //   client.cache.evict({ fieldName: 'PlayersQuery' });
  //   client.cache.gc();
  // }
  
  // if (players.loading) return '...';
  // if (players.error) return <React.Fragment>Error: ${players.error.message}</React.Fragment>;

  if (!userProfile) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="container">
        <PlayerForm actionForm='update' player={player} />
      </div>
    </>
  )
}
