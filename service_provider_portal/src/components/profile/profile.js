import React, { useEffect, useReducer, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Profile = () => {

  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Description, setDescription] = useState('');
  const [addressEmail, setaddressEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
  };
  return (
    <Container>
      <h1 className="text-black-50 p-3 text-center rounded">My Account</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-5">
          <Col
            lg={6}
            md={6}
            sm={12}
            style={{
              borderRightStyle: "solid",
              borderRightWidth: 2,
              borderRightColor: "#21ad83",
            }}
            className="m-auto"
          >
            <div className="p-5 mb-5">
              <h4 className="text-black-50 p-3 text-center">
                User Information
              </h4>
              <Row className="mb-5">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control value={PhoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="+961 03/030303" />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="formGridfirst">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={firstName} required onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridlast">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={LastName} required onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>
            </div>
            <div
              className="p-5"
              style={{
                borderTopStyle: "solid",
                borderTopWidth: 2,
                borderTopColor: "#21ad83",
              }}
            >
              <h4 className="text-black-50 p-3 mb-5 text-center">About Me</h4>

              <Row className="mb-5">
                <Form.Group as={Col} md="8" controlId="formGridDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control value={Description} required onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Description" />
                </Form.Group>
              </Row>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="rounded p-5 m-auto">
            <h4 className="text-black-50 p-3 text-center">
              Contact Information
            </h4>

            <Row className="mb-5">
              <Form.Group className="mb-1" controlId="formGridEmailAddress">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={addressEmail} required onChange={(e) => setaddressEmail(e.target.value)} type="email" placeholder="xyz@example.com" />
              </Form.Group>
            </Row>
          </Col>
          <Button
            className="mt-5"
            style={{
              margin: "auto",
              color: "white",
              backgroundColor: "#21ad83",
              borderColor: "#21ad83",
              width: "300px",
            }}
            type="submit"
          >
            Save Changes
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  box-sizing: inherit;
  font-weight: 300;
  margin: 100px;
`;

export default Profile;
