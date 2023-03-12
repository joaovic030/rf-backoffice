import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { authContext } from '../../auth/utils/authContext';

export function Header() {
  const { token, user } = useContext(authContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container className='justify-content-between'>
        <Navbar.Brand>
          <Link to="/players">Players</Link>
        </Navbar.Brand>
        { user && <Nav className='text-white'> Signed in as: {(user || {}).name} | {user.email} </Nav> }
      </Container>
    </Navbar>
  )
}