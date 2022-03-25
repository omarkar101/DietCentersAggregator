import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Profile = () => {
  return (
    <Container>
      <h1 className="text-black-50 p-3 text-center rounded">
        My Account
      </h1>
      <Form >
        <Row className="mt-5">
          <Col lg={6} md={6} sm={12} style={{ borderRightStyle: "solid", borderRightWidth: 2, borderRightColor: "#21ad83"}} className="m-auto" >
            <div className="p-5 mb-5">
              <h4 className="text-black-50 p-3 text-center">
                User Information
              </h4>
              <Row className="mb-5">
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="xyz@example.com" />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="formGridfirst">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridlast">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>
            </div>
            <div className="p-5" style={{ borderTopStyle: "solid", borderTopWidth: 2, borderTopColor: "#21ad83"}}>
              <h4 className="text-black-50 p-3 mb-5 text-center">About Me</h4>

              <Row className="mb-5">
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control placeholder="Weight in Kg" />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control placeholder="Height in cm" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Age</Form.Label>
                  <Form.Control placeholder="Age" />
                </Form.Group>
              </Row>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="rounded p-5 m-auto">
            <h4 className="text-black-50 p-3 text-center">
              Contact Information
            </h4>

            <Row className="mb-5">
              <Form.Group className="mb-5" controlId="formGridAddress">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="1234 Main st." />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Apartment, studio, or floor"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="Beirut" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formGridState">
                <Form.Label>Country</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>
          <Button className="mt-5" style={{margin: 'auto', color:"white", backgroundColor: "#21ad83", borderColor: "#21ad83", width: "300px"}} type='submit'>
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
