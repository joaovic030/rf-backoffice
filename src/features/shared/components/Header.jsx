import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { authContext } from '../../auth/utils/authContext';

export function Header() {
  const { token, user } = useContext(authContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container className='justify-content-between'>
        <Navbar.Brand>
          RF - Players Backoffice
        </Navbar.Brand>
        { user && <Nav className='text-white'> Signed in as: {(user || {}).name} | {user.email} </Nav> }
      </Container>
    </Navbar>
  )
}