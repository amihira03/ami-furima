<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('purchase')
            ->latest()
            ->get();

        return response()->json($items);
    }

    public function show($item_id)
    {
        $item = Item::with(['categories', 'condition', 'comments.user'])
            ->withCount(['likes', 'comments'])
            ->findOrFail($item_id);

        return response()->json($item);
    }

    // 自分が出品した商品一覧
    public function myItems()
    {
        $items = Item::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json($items);
    }
}
