import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signUpServiceProvider } from '../../api/requests';
import Authentication from "../../containers/auth_container";
import { useNavigate } from 'react-router-dom';

// do a modal instead of a container

const SignUp = (props) => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const auth = Authenti'cation.useContainer();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpServiceProvider(email, password, name, phoneNumber)
      .then(response => {
        console.log(response);
        if(response.data.success) {
          navigate('/login');
        } else {
          alert(response.data.message);
        }
      })
      .catch(e => {
        alert(e);
      }) 
  }

  return (
    <>
      <Container>
        <h1 className='shadow-sm text-success mt-5 p-3 text-center rounded'>Sign-Up</h1>
        <Row className='mt-5'>
          <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Name' onChange={e => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formBasicPhoneNumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type='text' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'
                  placeholder='Password' onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant='success btn-block' type='submit'>Sign-up</Button>
            </Form>
          </Col>
        </Row>
        <h6 className='mt-5 p-5 text-center text-secondary '>Copyright © 2022 Ali Srour. All Rights Reserved.</h6>
      </Container>
    </>
  );
};

export default SignUp;
