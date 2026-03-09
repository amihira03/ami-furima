<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use Illuminate\Support\Facades\Auth;

class TradeController extends Controller
{
    public function show(Purchase $purchase)
    {
        $purchase->load([
            'item.user',
            'user',
        ]);

        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        $purchase->messages()
            ->where('user_id', '!=', $user->id)
            ->whereNull('read_at')
            ->update([
                'read_at' => now(),
            ]);

        $purchase->load([
            'messages.user',
        ]);

        $partner = $purchase->user_id === $user->id
            ? $purchase->item->user
            : $purchase->user;

        $otherTrades = Purchase::with(['item', 'messages'])
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('item', function ($itemQuery) use ($user) {
                        $itemQuery->where('user_id', $user->id);
                    });
            })
            ->where('id', '!=', $purchase->id)
            ->get()
            ->filter(function ($trade) use ($user) {
                $isBuyer  = $trade->user_id === $user->id;
                $isSeller = $trade->item->user_id === $user->id;

                if ($isBuyer) {
                    return $trade->buyer_completed_at === null;
                }
                if ($isSeller) {
                    return $trade->seller_completed_at === null;
                }
                return false;
            })
            ->map(function ($trade) {
                $trade->latest_message_at = optional(
                    $trade->messages->sortByDesc('created_at')->first()
                )->created_at ?? $trade->created_at;
                return $trade;
            })
            ->sortByDesc('latest_message_at')
            ->values();

        $isBuyer = $purchase->user_id === $user->id;
        $isSeller = $purchase->item->user_id === $user->id;

        $showSellerEvaluationModal = false;

        if ($isSeller && $purchase->buyer_completed_at !== null) {
            $sellerEvaluationExists = $purchase->evaluations()
                ->where('rater_user_id', $user->id)
                ->exists();
            $showSellerEvaluationModal = ! $sellerEvaluationExists;
        }

        return view('trades.show', compact(
            'purchase',
            'partner',
            'otherTrades',
            'isBuyer',
            'isSeller',
            'showSellerEvaluationModal'
        ));
    }

    public function saveBody(Request $request, Purchase $purchase)
    {
        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        session(['trade_body_' . $purchase->id => $request->input('body')]);

        return response()->json(['ok' => true]);
    }
}
