import React, { useState } from "react";
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PlaceDropDown from "./placeDropDown";

const AppNavbar = () => {
  const [searchName, setSearchName] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', {state:{serviceProviderName:searchName}});
  };
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          JARO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/ordershistory'>
              Orders history
            </Nav.Link>
            <Nav.Link as={Link} to='/checkout'>
              Checkout
            </Nav.Link>
          </Nav>
          <PlaceDropDown />
          <Form className='d-flex' onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control onChange={(e) => setSearchName(e.target.value)}
                type='text' placeholder='Search Service Providers...' className='mr-sm-2' />
            </Form.Group>
            <Button variant='success btn-block' type='submit'>
              Search
            </Button>
          </Form>
          <Nav>
            <Nav.Link as={Link} to='/profile'>
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to='/signup'>
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
