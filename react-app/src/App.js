import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddShipment from './components/AddShipment';
import ShipmentList from './components/ShipmentList';
import Protected from './components/Protected';
import Container from 'react-bootstrap/Container';
import './assets/css/styles.css';


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
               <Route path="*" element={<><Protected /><ShipmentList /></>} />

            </Routes>
            <Footer />
         </Router>
      </Container>
   );
}

export default App;