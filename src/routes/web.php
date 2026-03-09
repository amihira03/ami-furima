<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\MyPageController;
use App\Http\Controllers\SellController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\TradeMessageController;
use App\Http\Controllers\EvaluationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/', [ItemController::class, 'index'])->name('items.index');

Route::get('/item/{item_id}', [ItemController::class, 'show'])
    ->name('items.show');

Route::middleware('auth')->group(function () {

    Route::get('/sell', [SellController::class, 'create'])->name('sell.create');
    Route::post('/sell', [SellController::class, 'store'])->name('sell.store');

    Route::get('/purchase/{item_id}', [PurchaseController::class, 'create'])
        ->name('purchases.create');

    Route::post('/purchase/{item_id}', [PurchaseController::class, 'store'])
        ->name('purchases.store');

    Route::get('/purchase/{item_id}/success', [PurchaseController::class, 'success'])
        ->name('purchases.success');

    Route::get('/purchase/{item_id}/cancel', [PurchaseController::class, 'cancel'])
        ->name('purchases.cancel');

    Route::get('/purchase/address/{item_id}', [AddressController::class, 'edit'])
        ->name('purchase.address.edit');

    Route::patch('/purchase/address/{item_id}', [AddressController::class, 'update'])
        ->name('purchase.address.update');

    Route::get('/mypage', [MyPageController::class, 'show'])
        ->name('mypage');

    Route::get('/mypage/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/mypage/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::post('/item/{item_id}/like', [ItemController::class, 'like'])
        ->name('items.like');

    Route::post('/item/{item_id}/comment', [CommentController::class, 'store'])
        ->name('items.comment.store');

    Route::get('/trades/{purchase}', [TradeController::class, 'show'])
        ->name('trades.show');

    Route::post('/trades/{purchase}/body', [TradeController::class, 'saveBody'])
        ->name('trades.body.save');

    Route::post('/trades/{purchase}/messages', [TradeMessageController::class, 'store'])
        ->name('trades.messages.store');

    Route::patch('/trades/messages/{tradeMessage}', [TradeMessageController::class, 'update'])
        ->name('trades.messages.update');

    Route::delete('/trades/messages/{tradeMessage}', [TradeMessageController::class, 'destroy'])
        ->name('trades.messages.destroy');

    Route::post('/trades/{purchase}/evaluations', [EvaluationController::class, 'store'])
        ->name('trades.evaluations.store');
});

Route::get('/email/verify-notice', function () {
    $user = auth()->user();

    if ($user && $user->hasVerifiedEmail()) {
        return redirect('/');
    }

    return view('auth.verify-notice');
})->middleware('auth')->name('verification.notice');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('status', 'verification-link-sent');
})->middleware('auth')->name('verification.send');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/mypage/profile');
})->middleware(['auth', 'signed'])->name('verification.verify');
