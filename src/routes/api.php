<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\AuthController;


// 認証不要
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{item_id}', [ItemController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 認証必要
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/my-items', [ItemController::class, 'myItems']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
