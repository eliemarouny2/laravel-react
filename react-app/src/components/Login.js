import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/css/styles.css';
import swal from 'sweetalert';
import axios from 'axios';


function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            navigate("/manage_shipments");
        }
    }, []);

    const Login = (e) => {
        e.preventDefault();
        let data = { email, password };
        data = JSON.stringify(data);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    localStorage.setItem('auth_email', res.data.email);
                    swal('Success', res.data.message, "success");
                    navigate('/manage_shipments');

                } else if (res.data.status === 401) {
                    swal('Warning', res.data.message, "warning");
                    console.log('unsuccessful');
                }
            });
        })

    }

    return (
        <Container className='mt-5 mb-4'>
            <Row className='justify-content-md-center'>
                <Col md={5} lg={6}>
                    <h2 className='mb-4'>Login</h2>
                    <form >
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="secondary" type="submit" onClick={Login}>
                            Log In
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;