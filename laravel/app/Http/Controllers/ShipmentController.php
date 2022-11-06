<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    function add_shipment(Request $req)
    {
        $email = $req->input('email');
        $user_id = User::where('email', $email)->value('id');
        $shipment = new Shipment;
        $shipment->waybill = $req->input('waybill');
        $shipment->customerAddress = $req->input('address');
        $shipment->customerName = $req->input('name');
        $shipment->customerPhone = $req->input('phone');
        $shipment->user_id = $user_id;
        $shipment->save();
        return $shipment;
    }
    function delete_shipment($id)
    {
        $result = Shipment::where('id', $id)->delete();
        return $result;
    }
    function view_shipment(Request $req)
    {
    }
    function manage_shipments(Request $req)
    {

        $user_id = User::where('email', $req->input('email'))->value('id');
        $shipments = Shipment::where('user_id', $user_id)->get();
        return $shipments;
    }
    function cancel_shipment(Request $req)
    {
    }
    function update_shipment(Request $req)
    {
    }
}
