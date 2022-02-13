import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            <Nav.Link as={Link} to='/meal_plans'>
              My Meal Plans
            </Nav.Link>
            <Nav.Link as={Link} to='/items'>
              My Items
            </Nav.Link>
          </Nav>
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
