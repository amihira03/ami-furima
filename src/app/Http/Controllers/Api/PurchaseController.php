<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    public function store(Request $request, $item_id)
    {
        $item = Item::with('purchase')->findOrFail($item_id);

        if ($item->purchase || $item->user_id === auth()->id()) {
            return response()->json(['message' => '購入できません'], 403);
        }

        DB::transaction(function () use ($request, $item) {
            $item->update([
                'shipping_postal_code' => $request->shipping_postal_code,
                'shipping_address' => $request->shipping_address,
                'shipping_building' => $request->shipping_building,
            ]);

            Purchase::create([
                'item_id' => $item->id,
                'user_id' => auth()->id(),
                'payment_method' => $request->payment_method,
            ]);
        });

        return response()->json(['message' => '購入が完了しました']);
    }

    public function myPurchases()
    {
        $purchases = Purchase::with('item')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($purchases);
    }

    public function myTrades()
    {
        $userId = Auth::id();

        $purchases = Purchase::with('item')
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->orWhereHas('item', function ($itemQuery) use ($userId) {
                        $itemQuery->where('user_id', $userId);
                    });
            })
            ->get()
            ->filter(function ($purchase) use ($userId) {
                $isBuyer = $purchase->user_id === $userId;
                $isSeller = $purchase->item->user_id === $userId;

                if ($isBuyer) {
                    return $purchase->buyer_completed_at === null;
                }
                if ($isSeller) {
                    return $purchase->seller_completed_at === null;
                }
                return false;
            })
            ->values();

        return response()->json($purchases);
    }
}
