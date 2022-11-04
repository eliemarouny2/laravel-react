import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Footer() {
  return (
    <Navbar fixed="bottom" bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
           <p>Copyright</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;