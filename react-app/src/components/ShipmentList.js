import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';



function ShipmentList() {

  const [shipments, setShipments] = useState([]);

  function viewShipment() {

  }
  function editShipment() {

  }
  function deleteShipment() {

  }

  async function fetchShipments() {
    let email = (JSON.parse(localStorage.getItem('user-info')).email);
    let jsonfile = { email };
    console.log(jsonfile);
    let response = await fetch("http://localhost:8000/api/manage_shipments", {
      method: 'POST',
      body: JSON.stringify(jsonfile),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

    })
    response = await response.json();
    setShipments(response);
    console.log(response);

  }

  useEffect(() => {
    fetchShipments();
  }, [])

  return (
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
              <Button variant="secondary" onClick={editShipment} >
                Edit
              </Button>
              &nbsp;
              <Button variant="danger" onClick={deleteShipment} >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ShipmentList;