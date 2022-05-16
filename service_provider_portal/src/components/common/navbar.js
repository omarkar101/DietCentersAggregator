import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ user }) => {
  return (
    <Navbar className="sticky-top" collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand as={Link} to='/meal_plans'>
          Welcome {user?.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {user != null && (
              <>
                <Nav.Link as={Link} to='/meal_plans'>
                  My Meal Plans
                </Nav.Link>
                <Nav.Link as={Link} to='/items'>
                  My Items
                </Nav.Link>
                <Nav.Link as={Link} to='/subscribed_clients'>
                  Subscribed Clients
                </Nav.Link>
                <Nav.Link as={Link} to='/order_history'>
                  Orders History
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user != null && (
              <Nav.Link as={Link} to='/profile'>
                <span class="material-symbols-outlined">
account_circle_full
</span>
              </Nav.Link>
            )}
            {user == null && (
              <Nav.Link as={Link} to='/signup'>
                Signup
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
