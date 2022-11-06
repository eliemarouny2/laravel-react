import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../assets/css/styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Login() {
    let navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/manage_shipments");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function logIn() {
        let credentials = { email, password };
        console.log(credentials);
        let response = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        if (response.ok) {
            response = await response.json();
            localStorage.setItem('user-info', JSON.stringify(response));
            navigate("/manage_shipments");
        } else {
            setError("Wrong Credentials");
        }

    }
    return (
        <Container className='mt-5 mb-4'>
            <Row className='justify-content-md-center'>
                <Col md={5} lg={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            {error && (<Form.Text className="red">{error}</Form.Text>)}
                        </Form.Group>
                        <Button variant="secondary" onClick={logIn} >
                            Log In
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;