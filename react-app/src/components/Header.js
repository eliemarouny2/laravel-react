import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Header() {
    let navigate = useNavigate();
    let user=(JSON.parse(localStorage.getItem('user-info')));

    async function logOut() {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Shipping Company</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <Nav.Link href="/manage_shipments">Manage Shipments</Nav.Link>
                                    <Nav.Link href="/add_shipment">Add Shipment</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </>
                        }
                    </Nav>
                    <Nav>
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <NavDropdown title={user && user.name} id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                      <Nav.Link href="/register">Guest</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;