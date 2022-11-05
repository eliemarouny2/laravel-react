import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../assets/css/styles.css';


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
        let item = { email, password };
        console.log(item);
        let response = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: JSON.stringify(item),
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
            setError("Invalid Credentials");
        }

    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {error && (
                    <Form.Text className="red">
                        Wrong Credentials
                    </Form.Text>
                )}

            </Form.Group>
            <Button variant="primary" onClick={logIn} >
                Submit
            </Button>
        </Form>
    )
}

export default Login;