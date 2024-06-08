<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class HistoryController extends Controller
{
    public function index() {
        $histories = History::query()->orderBy('created_at', 'desc')->limit(10)->get();
        return response()->json($histories);
    }

    public function store(Request $request) {
        // Hapus validasi yang memerlukan otorisasi
        $rules = [
            'user_id' => 'required|integer',
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
    
        // Simpan gambar ke penyimpanan
        $path = 'images/' . $imageName;
        Storage::disk('public')->put($path, $imageData);
    
        // Buat catatan history dalam database
        $history = History::create([
            'user_id' => $request->user_id,
            'image' => $path,
        ]);
    
        return response()->json([
            'message' => 'History created successfully',
            'data' => $history,
        ], 200);
    }
    
}
