<?php

namespace App\Http\Controllers;

use App\Models\SDLUser;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class SDLUserController extends Controller
{
    public function index() {
        $SDLUser=SDLUser::all();
        return response()->json($SDLUser);
    }

    public function show($id) {
        $SDLUser=SDLUser::find($id);
        return response()->json($SDLUser);
    }

    public function store(Request $request) {
        $rules=[
            'name' => 'required',
            'email' => 'required|unique:sdl_users,email',
            'pin' => 'required|unique:sdl_users,pin|numeric',
        ];

        $validator=Validator::make($request->all(),$rules);

        if($validator->fails()) {
            return response()->json($validator->errors());
        }

        $SDLUser=SDLUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'pin' => $request->pin,
        ]);

        return response()->json([
            'message' => 'SDLUser created successfully',
            'data' => $SDLUser,
        ]);
    }

    public function update(Request $request, $id) {
        $SDLUser=SDLUser::find($id);

        if(!$SDLUser) {
            return response()->json([
                'message' => 'SDLUser not found',
            ]);
        }

        $validator=Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|unique:sdl_users,email,'.$id,
            'pin' => 'required|numeric|unique:sdl_users,pin,'.$id,
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors());
        }
        
        $SDLUser->update([
            'name' => $request->name,
            'email' => $request->email,
            'pin' => $request->pin,
        ]);

        return response()->json([
            'message' => 'SDLUser updated successfully',
            'data' => $SDLUser,
        ]);
    }

    public function destroy($id) {
        $SDLUser=SDLUser::find($id);
            
            if(!$SDLUser) {
                return response()->json([
                    'message' => 'SDLUser not found',
                ]);
            }
    
            $SDLUser->delete();
    
            return response()->json([
                'message' => 'SDLUser deleted successfully',
            ]);
    }
}
