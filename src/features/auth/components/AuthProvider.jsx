import { useState } from 'react';
import { authContext } from '../utils/authContext';
import { Container, Navbar } from 'react-bootstrap'

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <authContext.Provider value={{ authToken, setAuthToken }}>
      <Navbar bg="dark" variant="dark">
        <Container className='justify-content-between'>
          <Navbar.Brand href="#home">Players</Navbar.Brand>
          { user && <Nav> {user.email} </Nav> }
        </Container>
      </Navbar>
      {children}
    </authContext.Provider>
  );
}
