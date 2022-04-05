import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import HomePage from "../home";
import styled from "styled-components";
import { loginServiceProvider } from "../../api/requests";
import Authentication from "../../containers/auth_container";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
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
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      {redirectToHome && <HomePage />}
      {!redirectToHome && (
        <Container>
          <h1 className="text-black-50 p-3 text-center rounded">Login</h1>
          <Row className="mt-5">
            <Col
              lg={4}
              md={6}
              sm={12}
              style={{
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "#21ad83",
              }}
              className="rounded p-5 m-auto shadow-sm rounded-lg"
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    pattern="^\S+@\S+\.\S+$"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Text className="text-muted" style={{fontSize: 12}}>
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
                  variant="success btn-block"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <h6 className="mt-5 p-5 text-center text-secondary ">
            Copyright © 2022 Ali Srour. All Rights Reserved.
          </h6>
        </Container>
      )}
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

export default Login;
