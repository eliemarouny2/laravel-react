<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    function register(Request $req)

    {
        $fields = $req->validate([
            'name'       =>  'required|string|max:191',
            'email'      =>  'required|email|string|unique:users|max:191',
            'password'   =>  'required|string|confirmed|min:6',
        ]);

        $user = User::create([
            'name'  =>  $fields['name'],
            'email'  =>  $fields['email'],
            'password'  =>  bcrypt($fields['password']),
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
        $fields = $req->validate([
            'email'     => 'required|email|string',
            'password'  => 'required|min:6'
        ]);

        $user = User::where('email', $fields['email'])->first();


        if (!$user || !Hash::check($fields['password'], $user->password)) {
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
