import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserProfile } from '../../auth/hooks/useUserProfile';
import { Header } from '../../shared/components/Header';
import { useApolloClient } from '@apollo/client';
import { PlayerForm } from '../components/PlayerForm';

export function CreatePlayerPage() {
  const userProfile = useUserProfile();

  if (!userProfile) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="container">
        <PlayerForm actionForm='create' />
      </div>
    </>
  )
}
