import React, { useState } from "react";
import { useCallback, useReducer, useEffect } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import HomePage from "../home";
import styled from "styled-components";
import { loginServiceProvider } from "../../api/requests";
import Authentication from "../../containers/auth_container";
import { Link, useNavigate } from "react-router-dom";
import ForgetPasswordModal from "./forget_passwod_modal";

const reducer = (state, action) => {
  switch (action.type) {
    case "open-forget-password-modal":
      return {
        ...state,
        modalOpen: true,
      };
    case "close-forget-password-modal":
      return { ...state, modalOpen: false };
    default:
      throw new Error();
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
  });

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [error, setError] = useState(null);
  const auth = Authentication.useContainer();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginServiceProvider(email, password)
      .then((response) => {
        if (response.data.success) {
          setError(null);
          auth.setToken(response.data.token);
          navigate("/");
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

  const toggleOpenModal = useCallback(() => {
    dispatch({ type: "open-forget-password-modal" });
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-forget-password-modal" });
  }, []);

  return (
    <>
      {error != null && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
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
                  variant="success btn-block"
                  type="submit"
                >
                  Login
                </Button>
                <div>
                  <Link to={`/signup`} style={{ fontSize: "13px" }}>
                    Don't have an account? Create One!
                  </Link>
                </div>
                <div>
                  <ForgetPasswordModal
                    isOpen={state.modalOpen}
                    onClose={toggleModalOnClose}
                  />
                  <LinkToForgetPassword
                    style={{ fontSize: "13px" }}
                    onClick={toggleOpenModal}
                  >
                    Forget Password?
                  </LinkToForgetPassword>
                  {/* <Link to={`/forget_password`} style={{ fontSize: '13px' }}>Forget Password?</Link> */}
                </div>
              </Form>
            </Col>
          </Row>
          <h6 className="mt-5 p-5 text-center text-secondary ">
            Copyright © 2022 JARO. All Rights Reserved.
          </h6>
        </Container>
      )}
    </>
  );
};

const LinkToForgetPassword = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
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
