<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\TradeMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class TradeController extends Controller
{
    public function show(Purchase $purchase)
    {
        $user = Auth::user();

        $purchase->load(['item.user', 'user']);

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        $purchase->messages()
            ->where('user_id', '!=', $user->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        $purchase->load(['messages.user']);

        $partner = $purchase->user_id === $user->id
            ? $purchase->item->user
            : $purchase->user;

        return response()->json([
            'purchase' => $purchase,
            'partner' => $partner,
            'is_buyer' => $purchase->user_id === $user->id,
            'is_seller' => $purchase->item->user_id === $user->id,
        ]);
    }

    public function sendMessage(Request $request, Purchase $purchase)
    {
        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        $message = TradeMessage::create([
            'purchase_id' => $purchase->id,
            'user_id' => $user->id,
            'body' => $request->input('body'),
            'read_at' => null,
        ]);

        $message->load('user');

        return response()->json($message, 201);
    }
}
