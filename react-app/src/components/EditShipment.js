import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,Form,Container,Row,Col} from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';

function EditShipment() {
  let navigate = useNavigate();

  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function getShipment(id) {
    await axios.get(`/api/get_shipment/${id}`).then(res => {
      setWaybill(res.data.shipment.waybill);
      setName(res.data.shipment.customerName);
      setAddress(res.data.shipment.customerAddress);
      setPhone(res.data.shipment.customerPhone);
    });
  }

  useEffect(() => {
    let id = localStorage.getItem('edit_id');
    getShipment(id);
  }, []);

  const updateShipment = (e) => {
    e.preventDefault();
    let data = {waybill, name, address, phone };
    data = JSON.stringify(data);
    console.log(data);
    axios.post('/api/update_shipment', data).then(res => {
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
          {
            phone ?

              <Form onSubmit={updateShipment}>
                <Form.Group className="mb-3" controlId="formBasicWaybill">
                  <Form.Label>Waybill:</Form.Label>
                  <Form.Control type="text" value={waybill} disabled placeholder="Enter waybill" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Customer Name:</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter customer name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Customer Address:</Form.Label>
                  <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter customer address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Customer Phone:</Form.Label>
                  <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter customer phone" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Update
                </Button>
              </Form>
              : <></>}
        </Col>
      </Row >
    </Container >
  );
}

export default EditShipment;