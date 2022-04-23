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
          setError(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e);
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

        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            style={{
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "#21ad83",
            }}
            className="rounded p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit} className="align-items:center">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  pattern="[a-z]+"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  pattern="[0-9]+"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
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
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
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
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2022 JARO. All Rights Reserved.
        </h6>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
  margin: 100px;
`;

export default SignUp;
