import React, { useState } from "react";
import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PlaceDropDown from "./placeDropDown";

const AppNavbar = ({ user }) => {
  const [searchName, setSearchName] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: { serviceProviderName: searchName } });
  };
  return (
    <Navbar className='sticky-top' collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          {user == null && <span>JARO</span>}
          {user != null && <span>Welcome {user?.first_name}</span>}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {user != null && (
              <Nav.Link as={Link} to='/ordershistory'>
                Orders history
              </Nav.Link>
            )}
          </Nav>
          
          {user != null && (
            <Form className='d-flex' onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={(e) => setSearchName(e.target.value)}
                type='text'
                placeholder='Search Service Providers...'
                className='mr-sm-2'
              />
            </Form.Group>
            <Button variant='success btn-block' type='submit'>
              Search
            </Button>
          </Form>
          )}
          {user != null && (
              <Nav.Link as={Link} to='/profile'>
                <span class='material-symbols-outlined'>account_circle_full</span>
              </Nav.Link>
            )}
          <Nav>
            {/* {user == null && (
              <Nav.Link as={Link} to='/signup'>
                Signup
              </Nav.Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
