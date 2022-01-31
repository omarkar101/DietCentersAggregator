import React from 'react'
import HomePage from './pages/home';
import Login from './pages/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/signup';
import TrackOrder from './pages/ordersPage/trackOrder';
import Collection from './components/common/collection';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const App = () => {
  return (
    <BrowserRouter>
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home">JARO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/delivery">Delivery</Nav.Link>
              <Nav.Link as={Link} to="/">Dining out</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/">Action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Another action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/">Profile</Nav.Link>
              <Nav.Link eventKey={2} as={Link} to="/signup">
                Signup
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </>
    </BrowserRouter>
  );
}

export default App;
