<?php

namespace App\Http\Controllers;

use App\Http\Requests\EvaluationRequest;
use App\Mail\TradeCompletedNotification;
use App\Models\Evaluation;
use App\Models\Purchase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class EvaluationController extends Controller
{
    public function store(EvaluationRequest $request, Purchase $purchase)
    {
        $user = Auth::user();

        $purchase->load([
            'item.user',
            'user',
            'evaluations',
        ]);

        $isBuyer = $purchase->user_id === $user->id;
        $isSeller = $purchase->item->user_id === $user->id;

        abort_unless($isBuyer || $isSeller, 403);

        if ($isSeller && $purchase->buyer_completed_at === null) {
            abort(403);
        }

        $evaluationExists = $purchase->evaluations()
            ->where('rater_user_id', $user->id)
            ->exists();

        if ($evaluationExists) {
            return redirect()->back()->with('error', 'すでに評価済みです。');
        }

        $ratedUserId = $isBuyer
            ? $purchase->item->user_id
            : $purchase->user_id;

        Evaluation::create([
            'purchase_id' => $purchase->id,
            'rater_user_id' => $user->id,
            'rated_user_id' => $ratedUserId,
            'score' => $request->input('score'),
        ]);

        if ($isBuyer && $purchase->buyer_completed_at === null) {
            $purchase->update([
                'buyer_completed_at' => now(),
            ]);

            Mail::to($purchase->item->user->email)->send(
                new TradeCompletedNotification($purchase)
            );
        }

        if ($isSeller && $purchase->seller_completed_at === null) {
            $purchase->update([
                'seller_completed_at' => now(),
            ]);
        }

        return redirect()->route('items.index')
            ->with('success', '評価を送信しました。');
    }
}
