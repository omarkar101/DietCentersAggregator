import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { signUpServiceProvider } from "../../api/requests";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = (props) => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpServiceProvider(email, password, name, phoneNumber)
      .then((response) => {
        if (response.data.success) {
          setError(null);
          navigate("/login");
        } else {
          console.log(response.data.message);
          setError('This email is already registered. Please login with your credentials.');
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setError('This email is already registered. Please login with your credentials.');
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      });
  };

  return (
    <>
      {error != null && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Container>
        <h1 className="text-black-50 p-3 text-center rounded">Sign-Up</h1>

        <Row style={{'display': 'flex', 'justify-content': 'center'}} className="m-2">
            <Form onSubmit={handleSubmit} className="w-50">
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  pattern="[a-zA-Z]+"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  pattern="\+[0-9]+"
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
                  Minimum eight characters, at least one uppercase letter, one
                  lowercase letter and one number.
                </Form.Text>
              </Form.Group>
              <Button
                className="mt-5"
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
