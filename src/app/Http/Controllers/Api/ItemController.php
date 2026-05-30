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
}
