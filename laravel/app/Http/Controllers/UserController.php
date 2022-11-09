<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    function register(Request $req)

    {
        $validator = Validator::make($req->all(),[
            'name'       =>  'required|string|max:191',
            'email'      =>  'required|email|string|unique:users|max:191',
            'password'   =>  'required|string|confirmed|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status'    => 401,
                'data'      => $validator->errors()
            ]);
         }

        $user = User::create([
            'name'  =>  $req->input('name'),
            'email'  =>  $req->input('email'),
            'password'  =>  bcrypt($req->input('password')),
        ]);

        $token = $user->createToken($user->email . '_token')->plainTextToken;

        return response()->json([
            'status'    => 200,
            'name'      => $user->name,
            'email'      => $user->email,
            'token'     => $token,
            'message'   => 'Registration successful'
        ]);
    }

    function login(Request $req)
    {
        $user = User::where('email', $req->input('email'))->first();

        if (!$user || !Hash::check($req->input('password'), $user->password)) {
            return response()->json([
                'status'    => 401,
                'message'   => 'Invalid credentials'
            ]);
        } else {
            $token = $user->createToken($user->email . '_token')->plainTextToken;
            return response()->json([
                'status'    => 200,
                'name'      => $user->name,
                'email'      => $user->email,
                'token'     => $token,
                'message'   => 'Login successful'
            ]);
        }
    }
    function logout()
    {
        auth()->user()->tokens->each(function($token,$ke){
            $token->delete();
        });
        return response()->json([
            'status'=>200,
            'message'=>'Logged out successfully'
        ]);
    }
}
