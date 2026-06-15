<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Models\TradeMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\EvaluationRequest;
use App\Http\Requests\TradeMessageRequest;
use App\Models\Evaluation;


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

    public function sendMessage(TradeMessageRequest $request, Purchase $purchase)
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

    public function complete(Purchase $purchase)
    {
        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        if ($purchase->user_id === $user->id) {
            // 購入者
            $purchase->update(['buyer_completed_at' => now()]);
        } else {
            // 出品者
            $purchase->update(['seller_completed_at' => now()]);
        }

        return response()->json($purchase);
    }

    public function evaluate(EvaluationRequest $request, Purchase $purchase)
    {
        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        $ratedUserId = $purchase->user_id === $user->id
            ? $purchase->item->user_id
            : $purchase->user_id;

        $evaluation = Evaluation::create([
            'purchase_id' => $purchase->id,
            'rater_user_id' => $user->id,
            'rated_user_id' => $ratedUserId,
            'score' => $request->input('score'),
        ]);

        return response()->json($evaluation, 201);
    }
}
