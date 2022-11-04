import react, { useState,useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Login() {
    let navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            navigate("/add");
        }
    },[]);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function logIn(){
        let item=[email,password];
        console.log(item);
        let result=await fetch("http://localhost:8000/api/login",{
            method:'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result=await result.json();
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate("/add");
    }
    return (
        <div className=''>
             <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e) => setPassword(e.target.value)} controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={logIn} >
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default Login;