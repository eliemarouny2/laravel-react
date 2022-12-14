import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import AddShipment from './components/AddShipment';
import ShipmentList from './components/ShipmentList';
import Protected from './components/Protected';
import EditShipment from './components/EditShipment';
import ViewShipment from './components/ViewShipment';
import './assets/css/styles.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
   const token=localStorage.getItem('auth_token');
   config.headers.Authorization=token ? `Bearer ${token}` : '';
   return config;
});

const App = () => {
   return (
      <Container fluid className="App">
         <Router>
            <Header />
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/add_shipment" element={<><Protected /><AddShipment /></>} />
               <Route path="/manage_shipments" element={<><Protected /><ShipmentList /></>} />
               <Route path="/edit_shipment" element={<><Protected /><EditShipment /></>} />
               <Route path="/view_shipment" element={<><Protected /><ViewShipment /></>} />
               <Route path="*" element={<><Protected /><ShipmentList /></>} />
            </Routes>
            <Footer />
         </Router>
      </Container>
   );
}

export default App;