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
    public function index(Request $request) {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 5);
        $histories = History::query();
        $histories = $histories->orderBy('created_at', 'desc');
        $histories = $histories->paginate($perPage, ['*'], 'page', $page);
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

        $history->update([
            'image' => $path,
        ]);

        return response()->json([
            'message' => 'History updated successfully',
            'data' => $history,
        ], 200);
    }

    public function todayHistoryCount() {
        date_default_timezone_set('Asia/Jakarta');
        $today = date('Y-m-d');
        $histories = History::whereDate('created_at', $today)->count();
        return response()->json([
            'message' => 'History updated successfully',
            'data' => $histories,
        ], 200);;
    }

    public function graphData() {
        date_default_timezone_set('Asia/Jakarta');
        
        // Generate the last 7 days' dates
        $dates = [];
        for ($i = 6; $i >= 0; $i--) {
            $dates[date('Y-m-d', strtotime("-$i days"))] = 0;
        }
        
        // Fetch the history data for the last 7 days
        $histories = History::selectRaw('DATE(created_at) as date, count(*) as count')
            ->whereBetween('created_at', [date('Y-m-d', strtotime('-7 days')), date('Y-m-d', strtotime('+1 days'))])
            ->groupBy('date')
            ->get();
        
        // Update the counts in the dates array
        foreach ($histories as $history) {
            $dates[$history->date] = $history->count;
        }
        
        // Prepare the final response array
        $result = [];
        foreach ($dates as $date => $count) {
            $result[] = ['date' => $date, 'count' => $count];
        }
        
        return response()->json($result);
    }
}
