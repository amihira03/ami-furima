<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExhibitionRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Condition;
use App\Models\Comment;
use App\Models\Like;
use App\Http\Requests\CommentRequest;
use Illuminate\Support\Facades\DB;


class ItemController extends Controller
{
    public function index()
    {
        $query = Item::with('purchase')->latest();

        if (auth('sanctum')->check()) {
            $query->where('user_id', '!=', auth('sanctum')->id());
        }

        $items = $query->get();

        return response()->json($items);
    }

    public function show($item_id)
    {
        $item = Item::with(['categories', 'condition', 'comments.user', 'purchase'])
            ->withCount(['likes', 'comments'])
            ->findOrFail($item_id);

        $likedByUser = false;

        if (auth('sanctum')->check()) {
            $likedByUser = Like::where('user_id', auth('sanctum')->id())
                ->where('item_id', $item_id)
                ->exists();
        }

        $item->liked_by_user = $likedByUser;

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

    public function addComment(CommentRequest $request, $item_id)
    {
        $comment = Comment::create([
            'user_id' => auth()->id(),
            'item_id' => $item_id,
            'body' => $request->input('body'),
        ]);

        $comment->load('user');

        return response()->json($comment, 201);
    }

    public function toggleLike($item_id)
    {
        $user = auth()->user();

        $like = Like::where('user_id', $user->id)
            ->where('item_id', $item_id)
            ->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'item_id' => $item_id,
            ]);
            $liked = true;
        }

        $likesCount = Like::where('item_id', $item_id)->count();

        return response()->json([
            'liked' => $liked,
            'likes_count' => $likesCount,
        ]);
    }
}
