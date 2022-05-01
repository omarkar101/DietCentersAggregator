import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { signUpServiceProvider } from "../../api/requests";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const SignUp = (props) => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadError = (message) => {
    setError(message);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      loadError('Please enter a username')
      return;
    }
    if (!phoneNumber) {
      loadError('Please enter a phone number')
      return;
    }
    if (!email) {
      loadError('Please enter an email')
      return;
    }
    if (!password) {
      loadError('Please enter a password')
      return;
    }
    if (!confirmPassword) {
      loadError('Please confirm password')
      return;
    }
    if (password != confirmPassword) {
      loadError('Passwords do not match!')
    }
    else {
    signUpServiceProvider(email, password, name, phoneNumber)
      .then((response) => {
        if (response.data.success) {
          setError(null);
          navigate("/login");
        } else {
          console.log(response.data.message);
          loadError('This email is already registered. Please sign up with a different email.');
        }
      })
      .catch((e) => {
        console.log(e);
        loadError('This email is already registered. Please sign up with a different email.');
      });
    }
  };

  return (
    <>
      <Container>
        <h1 className="text-black-50 p-3 text-center rounded mb-5">Sign-Up</h1>

          {error != null && (
            <div style={{color: '#D70040', textAlign: 'center', fontSize: 20}}>
              {error}
            </div>
          )}
        <Row style={{'display': 'flex', 'justify-content': 'center'}} className="m-2">
            <Form onSubmit={handleSubmit} className="w-50">
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  pattern="[a-zA-Z ]+"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  pattern="\+?[0-9]+"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  pattern="^\S+@\S+\.\S+$"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted" style={{ fontSize: 12 }}>
                  Your password should have a minimum of eight characters, at least one uppercase letter, one
                  lowercase letter, one number, and a symbol.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mt-1"
                style={{
                  color: "white",
                  backgroundColor: "#21ad83",
                  borderColor: "#21ad83",
                  width: "100%",
                }}
                variant="outline-success"
                type="submit"
              >
                Sign-up
              </Button>
              <div>
                <Link to={`/login`} style={{ fontSize: "13px" }}>
                  Already have an account? Login!
                </Link>
              </div>
            </Form>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2022 JARO. All Rights Reserved.
        </h6>
      </Container>
    </>
  );
};

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  max-height: initial;
  justify-content: center
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
`;

export default SignUp;
