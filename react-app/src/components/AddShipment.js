import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function AddShipment() {
  let navigate = useNavigate();

  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function addShipment() {
    let item = { waybill, name, address, phone };
    console.log(item);
    let result = await fetch("http://localhost:8000/api/add_shipment", {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    result = await result.json();
    navigate("/manage_shipments");

}

  return (
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
      <Button variant="primary" type="submit" onClick={addShipment}>
        Submit
      </Button>
    </Form>
  );
}

export default AddShipment;