import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginServiceProvider } from "../../api/requests";
import Authentication from "../../containers/auth_container";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = Authentication.useContainer()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginServiceProvider(email, password)
      .then((response) => {
        if (response.data.success) {
          auth.setToken(response.data.token);
          navigate('/');
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Container>
        <h1 className='shadow-sm text-success mt-5 p-3 text-center rounded'>Login</h1>
        <Row className='mt-5'>
          <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type='email'
                  placeholder='Enter email'
                  pattern='^\S+@\S+\.\S+$'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className='text-muted'>
                  Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.
                </Form.Text>
              </Form.Group>

              <Button variant='success btn-block' type='submit'>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <h6 className='mt-5 p-5 text-center text-secondary '>Copyright © 2022 Ali Srour. All Rights Reserved.</h6>
      </Container>
    </>
  );
};

export default Login;
