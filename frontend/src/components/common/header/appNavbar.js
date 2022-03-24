import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlaceDropDown from "./placeDropDown";

const AppNavbar = () => {
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
          <Form className='d-flex'>
            <Form.Control type='text' placeholder='Search' className='mr-sm-2' />
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
