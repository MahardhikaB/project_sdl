<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\History;
use Illuminate\Support\Facades\Validator;

class HistoryController extends Controller
{
    public function index() {
        $histories=History::query()->orderBy('created_at', 'desc')->limit(10)->get();
        return response()->json($histories);
    }

    public function store(Request $request) {
        // dd($request->all());
        $rules=[
            'user_id' => 'required',
            'image' => 'required',
        ];

        $validator=Validator::make($request->all(),$rules);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'errors' => $validator->errors()
        //     ], 404);
        // }

        $image = $request->file('image');

        if ($image) {
            $image_name= $image->store('images','public');
        }

        $history=History::create([
            'user_id' => $request->user_id,
            'image' => $image_name,
        ]);

        return response()->json([
            'message' => 'History created successfully',
            'data' => $history,
        ], 200);
    }


}
