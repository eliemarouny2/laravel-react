import react, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate  } from 'react-router-dom';

function Register() {
    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            navigate("/add");
        }
    },[])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function signUp() {
        let item = { name, email, password };
        console.log(item);
        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json();
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate("/add");

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
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={signUp} >
                Submit
            </Button>
        </Form>
    )
}

export default Register;