<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SDLUserController;
use App\Http\Controllers\HistoryController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/sdl_users', [SDLUserController::class, 'index']);

Route::get('/sdl_users/{id}', [SDLUserController::class, 'show']);

Route::post('/sdl_users', [SDLUserController::class, 'store']);

Route::put('/sdl_users/{id}', [SDLUserController::class, 'update']);

Route::delete('/sdl_users/{id}', [SDLUserController::class, 'destroy']);

Route::get('/history', [HistoryController::class, 'index']);

Route::post('/history', [HistoryController::class, 'store']);