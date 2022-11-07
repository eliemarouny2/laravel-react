import Table from 'react-bootstrap/Table';
import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaTrashAlt, FaEye, FaPen } from "react-icons/fa";
import axios from 'axios';


function ShipmentList() {

  const [shipments, setShipments] = useState([]);

  function viewShipment() {

  }
  function editShipment() {

  }
  async function deleteShipment(id) {
    let response = await fetch(`http://localhost:8000/api/delete_shipment/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
    response = await response.json();
    console.log(response);
    fetchShipments();

  }


  async function fetchShipments() {
    
    let email = localStorage.getItem('auth_email');
    let jsonfile = { email };
  axios.post('/api/shipment_list',jsonfile).then(res=>{
   setShipments(res.data.shipments);
  });
  }

  useEffect(() => {
    fetchShipments();
  }, [])

  return (
    <Container className="mb-5">
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
          {shipments && shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.waybill}</td>
              <td>{shipment.customerName}</td>
              <td>{shipment.customerAddress}</td>
              <td>{shipment.customerPhone}</td>
              <td>
                <Button variant="primary" title="view" size="sm" onClick={viewShipment} >
                  <FaEye />
                </Button>
                &nbsp;
                <Button variant="secondary" size="sm" title="edit" shipment={shipment.id} onClick={editShipment} >
                  <FaPen />
                </Button>
                &nbsp;
                <Button variant="danger" size="sm" title="delete" onClick={() => deleteShipment(shipment.id)} >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ShipmentList;