import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddShipment() {
  let navigate = useNavigate();
  let email = (JSON.parse(localStorage.getItem('user-info')).email);

  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function addShipment() {
    let item = { waybill, name, address, phone, email };
    console.log(item);
    let response = await fetch("http://localhost:8000/api/add_shipment", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then((response) => response.json());
      navigate("/manage_shipments");

 

  }

  return (
    <Container className='mt-5 mb-4' >
      <Row className='justify-content-md-center'>
        <Col md={5} lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Waybill</Form.Label>
              <Form.Control type="text" onChange={(e) => setWaybill(e.target.value)} placeholder="Enter waybill" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter customer name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Address</Form.Label>
              <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Enter customer address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Customer Phone</Form.Label>
              <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Enter customer phone" />
            </Form.Group>
            <Button variant="secondary" onClick={addShipment}>
              Add Shipment
            </Button>
          </Form>
        </Col>
      </Row >
    </Container >
  );
}

export default AddShipment;