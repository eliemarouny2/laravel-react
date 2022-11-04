import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddShipment from './components/AddShipment';
import ShipmentList from './components/ShipmentList';


const App = () => {
   return (
      <div className='App'>
         <Router>
            <Header/>
            <Routes>
               <Route path="/login" element={<Login/>} />
               <Route path="/register" element={<Register/>} />
               <Route path="/add_shipment" element={<AddShipment/>} />
               <Route path="/manage_shipments" element={<ShipmentList/>} />
            </Routes>
            <Footer/>
         </Router>
      </div>
   );
}

export default App;