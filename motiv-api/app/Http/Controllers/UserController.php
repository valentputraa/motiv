<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function Register(Request $request){

        $validated = $request->validate([
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'min:6'
        ]);

        $request['password'] = Hash::make($request['password']);

        $user = User::create($request->all());   
        $userData = [
            'username' => $user->username,
            'email' => $user->email
        ];

        return response()->json([
            'message' => 'User Created Successfully',
            'user' => $userData
        ],201);
    }

    public function Login(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        try {
            $user = User::where('email', $request->input('email'))->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User Not Found'], 404);
        }

        if (!password_verify($request->input('password'), $user->password)) {
            return response()->json(['error' => 'Invalid Password'], 401);
        }

        $token = $user->createToken('user login')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function getMe(Request $request){
        $user = $request->user();

        return response()->json(['data' => $user ]);
    }

    public function getUserPosts($id){
        $user = User::find($id);
        $posts = $user->posts;

        return response()->json(['posts' => $posts], 200);
    }
}
