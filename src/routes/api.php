<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PurchaseController;
use App\Http\Controllers\Api\TradeController;
use App\Http\Controllers\Api\ProfileController;


// 認証不要
Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/{item_id}', [ItemController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [ItemController::class, 'categories']);
Route::get('/conditions', [ItemController::class, 'conditions']);

// 認証必要
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/my-items', [ItemController::class, 'myItems']);
    Route::get('/my-likes', [ItemController::class, 'myLikes']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::post('/items/{item_id}/purchase', [PurchaseController::class, 'store']);
    Route::post('/items/{item_id}/comments', [ItemController::class, 'addComment']);
    Route::post('/items/{item_id}/like', [ItemController::class, 'toggleLike']);
    Route::get('/purchases/{purchase}', [TradeController::class, 'show']);
    Route::post('/purchases/{purchase}/messages', [TradeController::class, 'sendMessage']);
    Route::post('/purchases/{purchase}/complete', [TradeController::class, 'complete']);
    Route::post('/purchases/{purchase}/evaluate', [TradeController::class, 'evaluate']);
    Route::get('/my-purchases', [PurchaseController::class, 'myPurchases']);
    Route::get('/my-trades', [PurchaseController::class, 'myTrades']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
