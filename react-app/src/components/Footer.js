import {Container,Navbar} from 'react-bootstrap';
import '../assets/css/styles.css';

function Footer() {
  return (
    <Navbar fixed="bottom" bg="light" expand="lg">
      <Container>
        <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
           <p className='text-muted'>Shipment Company © All Rights Reserved </p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;