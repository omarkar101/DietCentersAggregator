import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { getClientProfile, updateClientProfile } from "../../api/requests";

const EditProfile = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Weight, setWeight] = useState('');
  const [Height, setHeight] = useState('');
  const [Age, setAge] = useState('');
  const [addressEmail, setaddressEmail] = useState('');
  const [addressName, setaddressName] = useState('');
  const [addressPhoneNumber, setaddressPhoneNumber] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [street, setstreet] = useState('');
  const [building, setbuilding] = useState('');
  const [floor, setfloor] = useState('');
  const [receiverFirstName, setreceiverFirstName] = useState('');
  const [receiverLastName, setreceiverLastName] = useState('');
  const [instructions, setinstructions] = useState('');

  useEffect(() => {
    getClientProfile()
      .then((response) => {
        if(response.data.success) {
          const clientPersonalInfo = response.data.client_personal_info;
          // console.log('response.data.client_personal_info:', clientPersonalInfo);
          setFirstName(clientPersonalInfo.first_name);
          setLastName(clientPersonalInfo.last_name);
          setPhoneNumber(clientPersonalInfo.phone_number);
          setaddressEmail(clientPersonalInfo.email);
          setWeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.weight : '');
          setAge(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.age : '');
          setHeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.height : '');
          setaddressName(clientPersonalInfo.address != null ? clientPersonalInfo.address.address_name : '');
          setaddressPhoneNumber(clientPersonalInfo.address != null ? clientPersonalInfo.address.phone_number : '');
          setcity(clientPersonalInfo.address != null ? clientPersonalInfo.address.city : '');
          setcountry(clientPersonalInfo.address != null ? clientPersonalInfo.address.country : '');
          setstreet(clientPersonalInfo.address != null ? clientPersonalInfo.address.street : '');
          setbuilding(clientPersonalInfo.address != null ? clientPersonalInfo.address.building : '');
          setfloor(clientPersonalInfo.address != null ? clientPersonalInfo.address.floor : '');
          setreceiverFirstName(clientPersonalInfo.address != null ? clientPersonalInfo.address.first_name : '');
          setreceiverLastName(clientPersonalInfo.address != null ? clientPersonalInfo.address.last_name : '');
          setinstructions(clientPersonalInfo.address != null ? clientPersonalInfo.address.instructions : '');
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClientProfile(firstName, LastName, PhoneNumber,
                        Weight, Height, Age, addressEmail,
                        addressName, addressPhoneNumber, city,
                        country, street, building, floor, 
                        receiverFirstName, receiverLastName, instructions)
      .then((response) => {
        if(response.data.success) {
          navigate("/profile", {state:{message: 'success'}});
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/profile", {state:{message: 'fail'}});
      });
  };

  return (
    <Container>
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
            className="m-auto">
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
              <Row className="mb-5">
                <Form.Group as={Col} md="6" controlId="formGridfirst">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={firstName} required onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridlast">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={LastName} required onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="formGridEmailAddress">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={addressEmail} required onChange={(e) => setaddressEmail(e.target.value)} type="email" placeholder="xyz@example.com" />
                </Form.Group>
              </Row>  
            </div>
            <div
              className="p-5"
              style={{
                borderTopStyle: "solid",
                borderTopWidth: 2,
                borderTopColor: "#21ad83",
              }}>
              <h4 className="text-black-50 p-3 mb-5 text-center">About Me</h4>
              <Row className="mb-5">
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control required value={Weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight in Kg" />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control required value={Height} onChange={(e) => setHeight(e.target.value)} placeholder="Height in cm" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Age</Form.Label>
                  <Form.Control required value={Age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
                </Form.Group>
              </Row>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="rounded p-5 m-auto">
            <h4 className="text-black-50 p-3 text-center">
              Contact Information
            </h4>
            <Row className="mb-5">
              <Form.Group className="mb-1" controlId="formGridAddressName">
                <Form.Label>Address Name</Form.Label>
                <Form.Control
                  required
                  value={addressName}
                  type="text"
                  placeholder="Home,Work,University..."
                  onChange={(e) => setaddressName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-1 mt-3"
                controlId="formGridAddressPhoneNumber">
                <Form.Label>Address Phone Number</Form.Label>
                <Form.Control value={addressPhoneNumber} required onChange={(e) => setaddressPhoneNumber(e.target.value)} type="tel" placeholder="+961 03/030303" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} required onChange={(e) => setcity(e.target.value)} placeholder="Beirut" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control value={country} required onChange={(e) => setcountry(e.target.value)} placeholder="Lebanon" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control value={street} required onChange={(e) => setstreet(e.target.value)} placeholder="Makdissi Street" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridBuilding">
                <Form.Label>Building</Form.Label>
                <Form.Control value={building} required onChange={(e) => setbuilding(e.target.value)} placeholder="Mirage building" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridFloor">
                <Form.Label>Floor</Form.Label>
                <Form.Control value={floor} required onChange={(e) =>setfloor(e.target.value)} placeholder="3rd floor" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridAddressFirstName">
                <Form.Label>Receiver First Name</Form.Label>
                <Form.Control value={receiverFirstName} required onChange={(e) => setreceiverFirstName(e.target.value)} placeholder="John" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formGridAddressLastName">
                <Form.Label>Receiver Last Name</Form.Label>
                <Form.Control value={receiverLastName} required onChange={(e) => setreceiverLastName(e.target.value)} placeholder="Doe" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddressInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control value={instructions} required onChange={(e) => setinstructions(e.target.value)} placeholder="Don't ring the bell, knock..." />
              </Form.Group>
            </Row>
          </Col>
            <Button
                as={Link} to='/profile'
                className="mt-5"
                style={{
                  margin: "auto",
                  color: "white",
                  backgroundColor: "#21ad83",
                  borderColor: "#21ad83",
                  width: "300px",
                }}
                type="cancel"
              >
              Cancel                
              </Button>
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

const UserInfo = styled.div`
  font-size: 20px;
`

const NoAddress = styled.div`
  color: grey;
`

export default EditProfile;
