import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/custom.css';
import moment from 'moment';

function EditShipment() {

  const [waybill, setWaybill] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [updated_at, setUpdated_at] = useState("");

  async function getShipment(id) {

    await axios.get(`/api/get_shipment/${id}`).then(res => {
      setWaybill(res.data.shipment.waybill);
      setName(res.data.shipment.customerName);
      setAddress(res.data.shipment.customerAddress);
      setPhone(res.data.shipment.customerPhone);
      setCreated_at(res.data.shipment.created_at);
      setUpdated_at(res.data.shipment.updated_at);
    });
  }

  useEffect(() => {
    let id = localStorage.getItem('view_id');
    getShipment(id);
  }, []);

  return (
    <>
      {updated_at ?
        <section className="vh-100 gradient-custom-2">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div className="card card-stepper">
                  <div className="card-header p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-2"> Waybill: &nbsp;<span className="fw-bold text-body">{waybill}</span></p>
                        <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">
                          {moment(created_at).format("DD M YYYY")}</span> </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex flex-row mb-4 pb-2">
                      <div className="flex-fill">
                        <h5 className="bold">{name}</h5>
                        <p className="text-muted">{address}</p>
                        <p className="text-muted">{phone}</p>
                        <p className="text-muted">last updated on: <span className="text-body"></span>{moment(updated_at).format("DD M YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer p-4">
                    <p className="text-muted">Shipping Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        : <></>}
    </>
  );
}

export default EditShipment;