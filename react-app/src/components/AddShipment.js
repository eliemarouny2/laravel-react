import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import swal from 'sweetalert';

function AddShipment() {
  let navigate = useNavigate();
  let email = localStorage.getItem('auth_email');

  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const addShipment = (e) => {
    e.preventDefault();
    let data = { waybill, name, address, phone, email };
    data = JSON.stringify(data);
    console.log(data);
    axios.post('/api/add_shipment', data).then(res => {
      if (res.data.status === 200) {
        swal('Success', res.data.message, "success");
        navigate('/manage_shipments');

      } else if (res.data.status === 401) {
        swal('Warning', res.data.message, "warning");
        console.log('unsuccessful');
      }
    });
  }

  return (
    <Container className='mt-5 mb-4' >
      <Row className='justify-content-md-center'>
        <Col md={5} lg={6}>
          <Form onSubmit={addShipment}>
            <Form.Group className="mb-3" controlId="formBasicWaybill">
              <Form.Label>Waybill</Form.Label>
              <Form.Control type="text" onChange={(e) => setWaybill(e.target.value)} placeholder="Enter waybill" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter customer name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Customer Address</Form.Label>
              <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Enter customer address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Customer Phone</Form.Label>
              <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Enter customer phone" />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Add Shipment
            </Button>
          </Form>
        </Col>
      </Row >
    </Container >
  );
}

export default AddShipment;