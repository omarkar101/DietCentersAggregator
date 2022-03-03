import React, { useState } from "react";
import { Button, Col, Form, Row, InputGroup, Card } from "react-bootstrap";
import { signUpClient } from "../../api/requests";
// import Login from "../login";
import styled from "styled-components";

const Checkout = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container>
      <h1 className="shadow-sm text-black-50 p-3 text-center rounded">
        Checkout
      </h1>
        <Row className="mt-5">
          <Col lg={6} md={6} sm={12} style={{ borderStyle: "solid", borderWidth: 2, borderColor: "#21ad83"}} className="rounded p-5 m-auto shadow-sm rounded-lg" >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h4 className="text-black-50 p-3 text-center">
              Customer Information
            </h4>
            <Row className="mb-3 mt-5">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="text" placeholder="First name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" placeholder="Last name" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control type="text" placeholder="Username" aria-describedby="inputGroupPrepend" required />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationCustom03">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <hr className="mt-5"/>

            <h4 className="text-black-50 p-3 text-center">
              Payment Information
            </h4>
            <Row className="mb-3 mt-5">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Credit Card Number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Credit Card Number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Month</Form.Label>
                <Form.Select defaultValue="">
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Month.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>Year</Form.Label>
                <Form.Select defaultValue="">
                  <option>2000</option>
                  <option>2001</option>
                  <option>2002</option>
                  <option>2003</option>
                  <option>2004</option>
                  <option>2005</option>
                  <option>2006</option>
                  <option>2007</option>
                  <option>2008</option>
                  <option>2009</option>
                  <option>2010</option>
                  <option>2011</option>
                  <option>2012</option>
                  <option>2013</option>
                  <option>2014</option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2012</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Year.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>CVC</Form.Label>
                <Form.Control type="text" placeholder="CVC" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid CVC.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-5">
              <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid"/>
            </Form.Group>
            <div style={{marginTop: 100}}>
              <Card className="text-center mb-5">
                <Card.Header style={{backgroundColor: "#bce6d988"}}>Checkout Summary</Card.Header>
                <Card.Body>
                  <Card.Title>Plan Ordered by the User</Card.Title>
                  <Card.Text>
                      Description of the Plan and what it includes
                  </Card.Text>
                  <Card.Text>
                      Any Images of the Plan/ Service
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted" style={{backgroundColor: "#bce6d988"}}>Total
                <Card.Text>
                    Toatal: 300$
                </Card.Text>
                </Card.Footer>
              </Card>
              </div>
        
              <Col style={{textAlign: "center"}}>
                <Button className="mt-5 text-center" style={{margin: 'auto', color:"white", backgroundColor: "#21ad83", borderColor: "#21ad83", width: "300px"}} type='submit'>
                  Submit Form
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
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

export default Checkout;
