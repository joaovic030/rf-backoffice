import { LoginForm } from '../components/LoginForm';
import { Col, Row, Container } from 'react-bootstrap'

export function LoginPage() {
  return (
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
  );
}
