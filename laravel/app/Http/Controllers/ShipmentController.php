<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Http\Request;

class ShipmentController extends Controller
{
    function add_shipment(Request $req)
    {
        $req->validate([
            'name'      =>  'required',
            'address'   =>  'required',
            'phone'     =>  'required',
            'waybill'   =>  'required|unique:shipments',
        ]);
        $email      = $req->input('email');
        $user_id    = User::where('email', $email)->value('id');

        $shipment = new Shipment;
        $shipment->waybill          = $req->input('waybill');
        $shipment->customerAddress  = $req->input('address');
        $shipment->customerName     = $req->input('name');
        $shipment->customerPhone    = $req->input('phone');
        $shipment->status           = 1;
        $shipment->user_id          = $user_id;
        $shipment->save();

        return response()->json([
            'status'    => 200,
            'message'   => 'Successfully Added'
        ]);
    }
    function cancel_shipment($id)
    {
        $shipment = Shipment::find($id);
        $shipment->status = 0;
        $shipment->update();
        return response()->json([
            'status'    =>  'ok',
            'message'   => 'Successfully Cancelled'

        ]);
    }
    function get_shipment($id)
    {
        $shipment = Shipment::where('id', $id)->first();
        return response()->json([
            'status'    =>  'ok',
            'shipment'  => $shipment
        ]);
    }
    function shipment_list(Request $req)
    {

        $user_id = User::where('email', $req->input('email'))->value('id');
        $shipments = Shipment::where('user_id', $user_id)->where('status', 1)->get();
        return response()->json([
            'status'    => 200,
            'shipments' => $shipments
        ]);
    }
    function update_shipment(Request $req)
    {
        $req->validate([
            'name'      =>  'required',
            'address'   =>  'required',
            'phone'     =>  'required',
            'waybill'   =>  'required',
        ]);
        $shipment = Shipment::where('waybill',$req->input('waybill'))->update([
            'customerAddress'       => $req->input('address'),
            'customerName'       => $req->input('name'),
            'customerPhone'       => $req->input('phone')
        ]);

        if($shipment){
            return response()->json([
                'status'    => 200,
                'message'   => 'Successfully Updated'
            ]);
        } else{
            return response()->json([
                'status'    => 500,
                'message'   => 'Error Updating'
            ]);
        }
       
        
    }
}
