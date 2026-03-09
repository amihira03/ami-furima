<?php

namespace Tests\Feature;

use App\Models\Evaluation;
use App\Models\Item;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TradeReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_review_seller(): void
    {
        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $item = Item::factory()->create([
            'user_id' => $seller->id,
        ]);

        $purchase = Purchase::factory()->create([
            'user_id' => $buyer->id,
            'item_id' => $item->id,
        ]);

        $response = $this->actingAs($buyer)
            ->post("/trades/{$purchase->id}/evaluations", [
                'score' => 5,
            ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('evaluations', [
            'purchase_id' => $purchase->id,
            'rater_user_id' => $buyer->id,
            'rated_user_id' => $seller->id,
            'score' => 5,
        ]);
    }

    public function test_seller_can_review_buyer(): void
    {
        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $item = Item::factory()->create([
            'user_id' => $seller->id,
        ]);

        $purchase = Purchase::factory()->create([
            'user_id' => $buyer->id,
            'item_id' => $item->id,
            'buyer_completed_at' => now(),
        ]);

        Evaluation::create([
            'purchase_id' => $purchase->id,
            'rater_user_id' => $buyer->id,
            'rated_user_id' => $seller->id,
            'score' => 5,
        ]);

        $response = $this->actingAs($seller)
            ->post("/trades/{$purchase->id}/evaluations", [
                'score' => 4,
            ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('evaluations', [
            'purchase_id' => $purchase->id,
            'rater_user_id' => $seller->id,
            'rated_user_id' => $buyer->id,
            'score' => 4,
        ]);
    }

    public function test_user_cannot_review_twice(): void
    {
        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $item = Item::factory()->create([
            'user_id' => $seller->id,
        ]);

        $purchase = Purchase::factory()->create([
            'user_id' => $buyer->id,
            'item_id' => $item->id,
        ]);

        $this->actingAs($buyer);

        $this->post("/trades/{$purchase->id}/evaluations", [
            'score' => 5,
        ]);

        $response = $this->post("/trades/{$purchase->id}/evaluations", [
            'score' => 4,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseCount('evaluations', 1);
    }
}
