<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index() {
        $user=User::all();
        return response()->json($user);
    }

    public function show($id) {
        $user=User::find($id);
        return response()->json($user);
    }

    public function profile() {
        $user=auth()->user();
        return response()->json($user);
    }

    public function store(Request $request) {
        $rules=[
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:8',
        ];

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),]);
        }

        $user=User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Admin created successfully',
            'data' => $user,
        ]);
    }

    public function update(Request $request, $id) {
        $user=User::find($id);

        if(!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Admin not found',
            ]);
        }

        $validator=Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$id,
            'password' => 'min:8|nullable'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ]);
        } 

        $data=[
            'name' => $request->name,
            'email' => $request->email,
        ];

        if($request->password) {
            $data['password'] = Hash::make($request->password);
        }
        
        $user->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Admin updated successfully',
            'data' => $user,
        ]);
    }

    public function destroy($id) {
        $user=User::find($id);
            
            if(!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Admin not found',
                ]);
            }
    
            $user->delete();
    
            return response()->json([
                'status' => true,
                'message' => 'Admin deleted successfully',
            ]);
    }
}
