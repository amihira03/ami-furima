<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
