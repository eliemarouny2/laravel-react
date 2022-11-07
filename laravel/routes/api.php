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

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('add_shipment', [ShipmentController::class, 'add_shipment']);
    Route::post('shipment_list', [ShipmentController::class, 'shipment_list']);
    Route::post('get_shipment', [ShipmentController::class, 'get_shipment']);
    Route::post('update_shipment', [ShipmentController::class, 'update_shipment']);
    Route::put('cancel_shipment/{id}', [ShipmentController::class, 'cancel_shipment']);
});
