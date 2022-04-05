import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Last } from "react-bootstrap/esm/PageItem";
import styled from "styled-components";
import { updateClientProfile } from "../../api/requests";

const Profile = () => {

  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [Weight, setWeight] = useState(null);
  const [Height, setHeight] = useState(null);
  const [Age, setAge] = useState(null);
  const [addressEmail, setaddressEmail] = useState(null);
  const [addressName, setaddressName] = useState(null);
  const [addressPhoneNumber, setaddressPhoneNumber] = useState(null);
  const [city, setcity] = useState(null);
  const [country, setcountry] = useState(null);
  const [street, setstreet] = useState(null);
  const [building, setbuilding] = useState(null);
  const [floor, setfloor] = useState(null);
  const [receiverFirstName, setreceiverFirstName] = useState(null);
  const [receiverLastName, setreceiverLastName] = useState(null);
  const [instructions, setinstructions] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClientProfile(firstName, LastName, PhoneNumber,
                        Weight, Height, Age, addressEmail,
                        addressName, addressPhoneNumber, city,
                        country, street, building, floor, 
                        receiverFirstName, receiverFirstName, instructions)
      .then((response) => {})
      .catch((e) => {
        alert(e);
      });
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
                  <Form.Control required onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="+961 03/030303" />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="formGridfirst">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridlast">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
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
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control required onChange={(e) => setWeight(e.target.value)} placeholder="Weight in Kg" />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control required onChange={(e) => setHeight(e.target.value)} placeholder="Height in cm" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Age</Form.Label>
                  <Form.Control required onChange={(e) => setAge(e.target.value)} placeholder="Age" />
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
                <Form.Control required onChange={(e) => setaddressEmail(e.target.value)} type="email" placeholder="xyz@example.com" />
              </Form.Group>
              <Form.Group className="mb-1" controlId="formGridAddressName">
                <Form.Label>Address Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Home,Work,University..."
                  onChange={(e) => setaddressName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="formGridAddressPhoneNumber"
              >
                <Form.Label>Address Phone Number</Form.Label>
                <Form.Control required onChange={(e) => setaddressPhoneNumber(e.target.value)} type="tel" placeholder="+961 03/030303" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control required onChange={(e) => setcity(e.target.value)} placeholder="Beirut" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select required onChange={(e) => setcountry(e.target.value)} defaultValue="Choose...">
                  <option value="Lebanon">Lebanon</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control required onChange={(e) => setstreet(e.target.value)} placeholder="Makdissi Street" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridBuilding">
                <Form.Label>Building</Form.Label>
                <Form.Control required onChange={(e) => setbuilding(e.target.value)} placeholder="Mirage building" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridFloor">
                <Form.Label>Floor</Form.Label>
                <Form.Control required onChange={(e) =>setfloor(e.target.value)} placeholder="3rd floor" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridAddressFirstName">
                <Form.Label>Receiver First Name</Form.Label>
                <Form.Control required onChange={(e) => setreceiverFirstName(e.target.value)} placeholder="John" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formGridAddressLastName">
                <Form.Label>Receiver Last Name</Form.Label>
                <Form.Control required onChange={(e) => setreceiverLastName(e.target.value)} placeholder="Doe" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddressInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control required onChange={(e) => setinstructions(e.target.value)} placeholder="Don't ring the bell, knock..." />
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
