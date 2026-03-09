<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyPageController extends Controller
{
    public function show(Request $request)
    {
        $userId = Auth::id();
        $page = $request->query('page', 'sell');
        $sellItems = collect();
        $buyItems = collect();
        $tradingPurchases = collect();

        $asBuyer = Purchase::with(['item.user', 'messages'])
            ->where('user_id', $userId)
            ->whereNull('buyer_completed_at')
            ->get();

        $asSeller = Purchase::with(['item.user', 'messages'])
            ->whereHas('item', fn($query) => $query->where('user_id', $userId))
            ->whereNull('seller_completed_at')
            ->get();

        $tradingPurchases = $asBuyer->merge($asSeller)
            ->map(function ($purchase) use ($userId) {
                $purchase->unread_count = $purchase->messages
                    ->where('user_id', '!=', $userId)
                    ->whereNull('read_at')
                    ->count();

                $purchase->latest_message_at = optional(
                    $purchase->messages->sortByDesc('created_at')->first()
                )->created_at ?? $purchase->created_at;

                return $purchase;
            })
            ->sortByDesc('latest_message_at')
            ->values();

        $totalUnreadCount = $tradingPurchases->sum('unread_count');

        if ($page === 'buy') {
            $itemIds = Purchase::where('user_id', $userId)
                ->latest()
                ->pluck('item_id')
                ->all();

            $itemsById = Item::whereIn('id', $itemIds)->get()->keyBy('id');

            $buyItems = collect($itemIds)
                ->map(fn($id) => $itemsById->get($id))
                ->filter();
        } elseif ($page !== 'trade') {
            $sellItems = Item::where('user_id', $userId)
                ->latest()
                ->get();

            $soldItemIds = Purchase::whereIn('item_id', $sellItems->pluck('id'))
                ->pluck('item_id')
                ->all();

            foreach ($sellItems as $item) {
                $item->is_sold = in_array($item->id, $soldItemIds, true);
            }
        }

        return view('mypage.index', [
            'page' => $page,
            'sellItems' => $sellItems,
            'buyItems' => $buyItems,
            'tradingPurchases' => $tradingPurchases,
            'totalUnreadCount' => $totalUnreadCount,
        ]);
    }
}
