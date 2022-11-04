import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';



function ShipmentList() {

  const [data, setData] = useState([]);

  function viewShipment() {

  }
  function editShipment() {

  }
  function deleteShipment() {

  }

  async function fetchShipments() {
    let result = await fetch("http://localhost:8000/api/manage_shipments", {
      method: 'POST',
      body: "",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

    }).then((result) => result.json());
    setData(result);

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
        {data && data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.waybill}</td>
            <td>{item.customerName}</td>
            <td>{item.customerAddress}</td>
            <td>{item.customerPhone}</td>
            <td>
              <Button variant="primary" onClick={viewShipment} >
                View
              </Button>
              &nbsp;
              <Button variant="warning" onClick={editShipment} >
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