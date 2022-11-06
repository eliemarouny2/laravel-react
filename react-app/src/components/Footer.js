import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/css/styles.css';


function Footer() {
  return (
    <Navbar fixed="bottom" bg="light" expand="lg">
      <Container>
        <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
           <p>All Rights Reserved ©</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;