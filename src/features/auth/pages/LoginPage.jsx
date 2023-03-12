import { LoginForm } from '../components/LoginForm';
import { Col, Row, Container } from 'react-bootstrap'
import { Header } from '../../shared/components/Header';

export function LoginPage() {
  return (
    <>
      <Header />
      <Container>
        <Row className='mt-3'>
          <Col></Col>
          <Col xs={5}>
            <h2>Login</h2>
            <LoginForm />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
