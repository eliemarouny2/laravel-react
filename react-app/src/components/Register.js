import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [error, setError] = useState("");
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/manage_shipments");
        }
    }, [])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function signUp() {
        let item = { name, email, password };
        console.log(item);
        let response = await fetch("http://localhost:8000/api/register", {
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
            setError("Email Already exists");
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                {error && (<Form.Text className="red">{error}</Form.Text>)}
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={signUp} >
                Register
            </Button>
        </Form>
    )
}

export default Register;