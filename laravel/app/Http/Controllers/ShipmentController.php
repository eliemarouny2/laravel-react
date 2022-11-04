<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    function add_shipment(Request $req)
    {
        $shipment = new Shipment;
        $shipment->waybill = $req->input('waybill');
        $shipment->customerAddress = $req->input('customerAddress');
        $shipment->customerName = $req->input('customerName');
        $shipment->customerPhone = $req->input('customerPhone');
        $shipment->user_id = $req->input('user_id');
        $shipment->save();
        return $shipment;
    }
    function delete_shipment($id)
    {
        
    }
    function view_shipment(Request $req)
    {

    }
    function manage_shipments(Request $req)
    {
       $shipments=Shipment::get();
       return $shipments;
 
    }
    function cancel_shipment(Request $req)
    {
        
    }
    function update_shipment(Request $req)
    {
        
    }

}
