import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    const [nameerror, setNameerror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [passworderror, setpassworderror] = useState("");

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            navigate("/manage_shipments");
        }
    }, [])

    const signUp = (e) => {
        e.preventDefault();
        setNameerror('');
        setEmailerror('');
        setpassworderror('');
        let data = { name, email, password, password_confirmation };
        data = JSON.stringify(data);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    localStorage.setItem('auth_email', res.data.email);
                    swal('Success', res.data.message, "success");
                    navigate('/manage_shipments');

                } else if (res.data.status === 401) {
                    setNameerror(res.data.data.name);
                    setEmailerror(res.data.data.email);
                    setpassworderror(res.data.data.password);
                }
            });
        })

    }

    return (
        <Container className='mt-5 mb-4'>
            <Row className='justify-content-md-center'>
                <Col md={5} lg={6}>
                    <h2 className='mb-4'>Register</h2>
                    <form onSubmit={signUp}>
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                             <Form.Text className="text-muted">
                                {nameerror}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                            <Form.Text className="text-muted">
                                {emailerror}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Form.Text className="text-muted">
                                {passworderror}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password_confirmation} placeholder="Password Confirmation" onChange={(e) => setPassword_confirmation(e.target.value)} />
                         
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Register
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container >
    )
}

export default Register;