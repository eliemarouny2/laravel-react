<?php

use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

Route::post('add_shipment',[ShipmentController::class,'add_shipment']);
Route::post('delete_shipment',[ShipmentController::class,'delete_shipment']);
Route::post('manage_shipments',[ShipmentController::class,'manage_shipments']);
Route::post('view_shipment',[ShipmentController::class,'view_shipment']);
Route::post('update_shipment',[ShipmentController::class,'update_shipment']);
Route::post('cancel_shipment',[ShipmentController::class,'cancel_shipment']);

