<?php

namespace Tests\Feature;

use App\Mail\TradeCompletedNotification;
use App\Models\Item;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class TradeMailTest extends TestCase
{
    use RefreshDatabase;

    public function test_mail_is_sent_when_buyer_completes_trade(): void
    {
        Mail::fake();

        $seller = User::factory()->create([
            'email' => 'seller@test.com',
        ]);

        $buyer = User::factory()->create();

        $item = Item::factory()->create([
            'user_id' => $seller->id,
        ]);

        $purchase = Purchase::factory()->create([
            'user_id' => $buyer->id,
            'item_id' => $item->id,
        ]);

        $this->actingAs($buyer)
            ->post("/trades/{$purchase->id}/evaluations", [
                'score' => 5,
            ]);

        Mail::assertSent(TradeCompletedNotification::class, function ($mail) use ($seller) {
            return $mail->hasTo($seller->email);
        });
    }
}
