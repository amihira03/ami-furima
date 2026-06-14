<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExhibitionRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Condition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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

    public function myItems()
    {
        $items = Item::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json($items);
    }

    // カテゴリ一覧
    public function categories()
    {
        return response()->json(Category::orderBy('id')->get());
    }

    // 商品の状態一覧
    public function conditions()
    {
        return response()->json(Condition::orderBy('id')->get());
    }

    public function store(ExhibitionRequest $request)
    {
        $validated = $request->validated();

        $item = DB::transaction(function () use ($request, $validated) {
            $storedPath = $request->file('image')->store('items', 'public');

            $item = Item::create([
                'user_id' => $request->user()->id,
                'name' => $validated['name'],
                'brand_name' => $validated['brand_name'] ?? null,
                'description' => $validated['description'],
                'price' => $validated['price'],
                'condition_id' => $validated['condition_id'],
                'image_path' => $storedPath,
            ]);

            $item->categories()->sync($validated['categories']);

            return $item;
        });

        return response()->json($item, 201);
    }
}
