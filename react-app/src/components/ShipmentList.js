import {Table,Button,Container} from 'react-bootstrap';
import { React,useState, useEffect } from 'react';
import { FaTrashAlt, FaEye, FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';


function ShipmentList() {
  const [shipments, setShipments] = useState([]);

  async function cancelShipment(id) {
    let email = localStorage.getItem('auth_email');
    let jsonfile = { email, id };
    console.log(jsonfile);
    axios.post('/api/cancel_shipment', jsonfile).then(res => {
      setShipments(res.data.shipments);
    });
  }

  const handleEdit = (id) => {
    localStorage.setItem('edit_id', id);
  }

  const handleView = (id) => {
    localStorage.setItem('view_id', id);
  }

  async function fetchShipments() {
    let email = localStorage.getItem('auth_email');
    let jsonfile = { email };
    axios.post('/api/shipment_list', jsonfile).then(res => {
      setShipments(res.data.shipments);
    });
  }

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <Container className="mb-5">
      { shipments.length ?
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Waybill</th>
                <th>Customer Name</th>
                <th>Customer Address</th>
                <th>Customer Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.id}</td>
                  <td>{shipment.waybill}</td>
                  <td>{shipment.customerName}</td>
                  <td>{shipment.customerAddress}</td>
                  <td>{shipment.customerPhone}</td>
                  <td>
                  <Link to="/view_shipment">
                    <Button variant="primary" title="view" size="sm" onClick={()=>handleView(shipment.id)} >
                      <FaEye />
                    </Button>
                    </Link>
                    &nbsp;
                    <Link to="/edit_shipment">
                      <Button variant="secondary" size="sm" title="edit" shipment={shipment.id} onClick={() => handleEdit(shipment.id)} >
                        <FaPen />
                      </Button>
                    </Link>
                    &nbsp;
                    <Button variant="danger" size="sm" title="delete" onClick={() => cancelShipment(shipment.id)} >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          : <h3 className='text-center  mt-5 text-muted'>It looks like you don't have any shipments right now</h3>}
    </Container>
  );
}

export default ShipmentList;