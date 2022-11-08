import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Header() {
    let navigate = useNavigate();
    let user = (localStorage.getItem('auth_name'));

    async function logOut() {
        localStorage.clear();
        swal('Success',"Successfully logged out","success");
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
                            localStorage.getItem('auth_token') ?
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
                            localStorage.getItem('auth_token') ?
                                <>
                                    <NavDropdown title={user} id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;