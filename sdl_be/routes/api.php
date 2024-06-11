<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SDLUserController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\AuthController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');





Route::post('/history', [HistoryController::class, 'store']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
});

Route::group(
    [
        'middleware' => 'auth:api',

    ],
    function () {
        Route::get('/sdl_users', [SDLUserController::class, 'index']);
        
        Route::get('/sdl_users/{id}', [SDLUserController::class, 'show']);

        Route::post('/sdl_users', [SDLUserController::class, 'store']);

        Route::put('/sdl_users/{id}', [SDLUserController::class, 'update']);

        Route::delete('/sdl_users/{id}', [SDLUserController::class, 'destroy']);

        Route::get('/admin', [AdminController::class, 'index']);
        
        Route::get('/admin/{id}', [AdminController::class, 'show']);

        Route::get('/admin/profile/get', [AdminController::class, 'profile']);

        Route::post('/admin', [AdminController::class, 'store']);

        Route::put('/admin/{id}', [AdminController::class, 'update']);

        Route::delete('/admin/{id}', [AdminController::class, 'destroy']);

        Route::get('/history_today', [HistoryController::class, 'todayHistoryCount']);

        Route::get('/graph', [HistoryController::class, 'graphData']);
    }
);

Route::get('/history', [HistoryController::class, 'index']);

Route::post('/history', [HistoryController::class, 'store']);

Route::post('/history/update', [HistoryController::class, 'update']);