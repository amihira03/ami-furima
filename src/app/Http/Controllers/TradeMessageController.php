<?php

namespace App\Http\Controllers;

use App\Http\Requests\TradeMessageRequest;
use App\Models\Purchase;
use App\Models\TradeMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TradeMessageController extends Controller
{
    public function store(TradeMessageRequest $request, Purchase $purchase)
    {
        $user = Auth::user();

        if ($purchase->user_id !== $user->id && $purchase->item->user_id !== $user->id) {
            abort(403);
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/trade_messages', 'public');
        }

        TradeMessage::create([
            'purchase_id' => $purchase->id,
            'user_id' => $user->id,
            'body' => $request->input('body'),
            'image_path' => $imagePath,
            'read_at' => null,
        ]);

        session()->forget('trade_body_' . $purchase->id);

        return redirect()
            ->route('trades.show', $purchase)
            ->with('message_sent', true);
    }

    public function destroy(TradeMessage $tradeMessage)
    {
        if ($tradeMessage->user_id !== Auth::id()) {
            abort(403);
        }

        $purchaseId = $tradeMessage->purchase_id;

        if ($tradeMessage->image_path) {
            Storage::disk('public')->delete($tradeMessage->image_path);
        }

        $tradeMessage->delete();

        return redirect()->route('trades.show', $purchaseId);
    }

    public function update(TradeMessageRequest $request, TradeMessage $tradeMessage)
    {
        if ($tradeMessage->user_id !== Auth::id()) {
            abort(403);
        }

        $tradeMessage->update([
            'body' => $request->input('body'),
        ]);

        return redirect()->route('trades.show', $tradeMessage->purchase_id);
    }
}
