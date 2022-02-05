import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup, Card } from "react-bootstrap";
import "./checkout.css";

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
    <div className="checkout-form">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h1>Customer Info</h1>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Address.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <h1>Payment Info</h1>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom03">
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
          <Form.Group as={Col} md="2" controlId="validationCustom03">
            <Form.Label>Month</Form.Label>
            <Form.Select size="sm" defaultValue="">
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
          <Form.Group as={Col} md="2" controlId="validationCustom04">
            <Form.Label>Year</Form.Label>
            <Form.Select size="sm" defaultValue="">
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
          <Form.Group as={Col} md="2" controlId="validationCustom05">
            <Form.Label>CVC</Form.Label>
            <Form.Control type="text" placeholder="CVC" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid CVC.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>

      <Card className="text-center">
        <Card.Header>Summary</Card.Header>
        <Card.Body>
          <Card.Title>esem el plan li bado yeha el user</Card.Title>
          <Card.Text>
              suret el plan li mahtuta
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Total
        <Card.Text>
            300$
        </Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Checkout;
