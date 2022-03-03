import React from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import styled from "styled-components";
import UploadAndDisplayImage from "../uploadImage/UploadAndDisplayImage";

const Profile = () => {
  return (
    <BaseContainer>
      <div style={{ width: "45%" }}>
        <ProfileEditContainer>
          <h3>My account</h3>
          <hr />
          <div>
            <h4>User Information</h4>
            <Form>
              <Row className='mb-3'>
                <Form.Group as={Col} md='6' controlId='formGridlast'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' placeholder='Name' />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} md='6' controlId='formGridEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='xyz@example.com' />
                </Form.Group>
              </Row>
              <hr />
              <h4>Contact Information</h4>

              <Form.Group className='mb-3' md='5' controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder='1234 Main St' />
              </Form.Group>

              <Form.Group className='mb-3' md='5' controlId='formGridAddress2'>
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder='Apartment, studio, or floor' />
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} md='3' controlId='formGridCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder='Beirut' />
                </Form.Group>

                <Form.Group as={Col} md='3' controlId='formGridState'>
                  <Form.Label>Country</Form.Label>
                  <Form.Select defaultValue='Choose...'>
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant='primary' type='submit'>
                Save Changes
              </Button>
            </Form>
          </div>
        </ProfileEditContainer>
      </div>
      <div style={{ width: "45%" }}>
        <Card style={{ width: "100%", "margin-top": "20px", "margin-bottom": "20px" }}>
          <Card.Body>
            <Card.Title>Add a profile image</Card.Title>
            <Card.Text>
              <UploadAndDisplayImage />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ProfileEditContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Profile;
