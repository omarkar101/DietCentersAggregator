import React from 'react'
import HomePage from './pages/home';
import Login from './pages/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/signup';
import TrackOrder from './pages/ordersPage/trackOrder';
import Collection from './components/common/collection';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Checkout from './components/checkout/checkout';
import OrdersHistory from './components/ordersHistory/ordersHistory';

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
              <Nav.Link as={Link} to="/ordershistory">Orders history</Nav.Link>
              <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
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
              <Nav.Link as={Link} to="/signup">
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordershistory" element={<OrdersHistory />} />

        </Routes>
      </div>

    </>
    </BrowserRouter>
  );
}

export default App;
