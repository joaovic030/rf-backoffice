import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../mutations/useLoginMutation';
import { Form, Button, Col, Row } from 'react-bootstrap'

export function LoginForm() {
  const { register, handleSubmit } = useForm();

  const login = useLoginMutation();

  const onSubmit = (values) => {
    login({ variables: { credentials: values } });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control {...register('email', { required: true })} type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register('password', { required: true, minLength: 6 })} type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col>
          <Button type="submit" className='w-100'>Sign in</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
