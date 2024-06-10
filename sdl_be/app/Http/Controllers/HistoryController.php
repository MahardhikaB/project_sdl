<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use App\Models\SDLUser;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class HistoryController extends Controller
{
    public function index() {
        $histories = History::query()->orderBy('created_at', 'desc')->limit(4)->get();
        return response()->json($histories);
    }

    public function store(Request $request) {
        // make timezone jakarta indonesia
        date_default_timezone_set('Asia/Jakarta');
        $rules = [
            'user_pin' => 'required|integer|digits:4',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 404);
        }

        $user = SDLUser::where('pin', $request->user_pin)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Access denied',
            ], 404);
        }

        // Create history record in database
        $history = History::create([
            'user_id' => $user->id,
            // 'image' => $path,
        ]);

        return response()->json([
            'message' => 'Access granted',
            'data' => $history,
        ], 200);
    }

    public function update(Request $request) {

        $history = History::orderBy('created_at', 'desc')->first();

        if (!$history) {
            return response()->json([
                'message' => 'History not found',
            ], 404);
        }

        $rules = [
            'image_name' => 'required|string',
            'image_file' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 404);
        }

        // Decode base64 image
        $imageData = base64_decode($request->image_file);
        $imageName = $request->image_name . '.jpg';

        // Save the image to storage
        $path = 'images/' . $imageName;
        Storage::disk('public')->put($path, $imageData);

        // $image = $request->file('image');

        // if ($image) {
        //     $image_name= $image->store('images','public');
        // }

        $history->update([
            'image' => $path,
        ]);

        return response()->json([
            'message' => 'History updated successfully',
            'data' => $history,
        ], 200);
    }
}
