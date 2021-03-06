import React, { useState } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { forgetPassword, updatePassword } from "../../api/requests";

const ForgetPasswordModal = (props) => {
  const { isOpen, onClose } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [pin, setPin] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    if (password === confirmPassword) {
      updatePassword(email, password, pin)
        .then((response) => {
          if (response.data.success) {
            console.log("success");
          } else {
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (email == null || email === '') return;
    forgetPassword(email)
      .then((response) => {
        if (response.data.success) {
          setDisabled(false);
        } else {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      })
      .catch((e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
  };
  return (
    <ForgetPasswordContainer>
      <Modal show={isOpen} onHide={onClose} onClose={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendEmail}>
            <Form.Label>Email Address</Form.Label>
            <Row>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  required
                  type='email'
                  placeholder='Email Address'
                  pattern='^\S+@\S+\.\S+$'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Col>
                  <Button
                    className='mt-1'
                    style={{
                      color: "white",
                      backgroundColor: "#21ad83",
                      borderColor: "#21ad83",
                      width: "100%",
                    }}
                    variant='success btn-block'
                    type='submit'>
                    Send Pin!
                  </Button>
                  {!disabled && <div class="alert alert-success mt-2" role="alert">Please check your email address for the pin!</div>}
                </Col>
              </Form.Group>
            </Row>
          </Form>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group className='mb-1' controlId='formBasicPin'>
                <Form.Label>Pin</Form.Label>
                <Form.Control
                  required
                  disabled={disabled}
                  type='text'
                  placeholder='Pin'
                  onChange={(e) => setPin(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-1' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  disabled={disabled}
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-1' controlId='formBasicConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  disabled={disabled}
                  type='password'
                  placeholder='Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className='mt-1'
                style={{
                  color: "white",
                  backgroundColor: "#21ad83",
                  borderColor: "#21ad83",
                  width: "100%",
                }}
                variant='success btn-block'
                disabled={disabled}
                type='submit'>
                Submit
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </ForgetPasswordContainer>
  );
};

const ForgetPasswordContainer = styled.div`
  position: absolute;
  max-height: initial;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
  margin: 100px;
`;

export default ForgetPasswordModal;
