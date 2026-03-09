<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TradeMessageTest extends TestCase
{
    use RefreshDatabase;

    public function test_trade_message_01_user_can_post_message(): void
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

        $response = $this->post("/trades/{$purchase->id}/messages", [
            'body' => '取引メッセージテスト',
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('trade_messages', [
            'purchase_id' => $purchase->id,
            'user_id' => $buyer->id,
            'body' => '取引メッセージテスト',
        ]);
    }

    public function test_trade_message_02_body_is_required(): void
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

        $response = $this->from("/trades/{$purchase->id}")
            ->post("/trades/{$purchase->id}/messages", [
                'body' => '',
            ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'body' => '本文を入力してください',
        ]);

        $this->assertDatabaseCount('trade_messages', 0);
    }

    public function test_trade_message_03_body_must_be_within_400_characters(): void
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

        $response = $this->from("/trades/{$purchase->id}")
            ->post("/trades/{$purchase->id}/messages", [
                'body' => str_repeat('あ', 401),
            ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'body' => '本文は400文字以内で入力してください',
        ]);

        $this->assertDatabaseCount('trade_messages', 0);
    }

    public function test_trade_message_04_image_must_be_png_or_jpeg(): void
    {
        Storage::fake('public');

        $seller = User::factory()->create();
        $buyer = User::factory()->create();

        $item = Item::factory()->create([
            'user_id' => $seller->id,
        ]);

        $purchase = Purchase::factory()->create([
            'user_id' => $buyer->id,
            'item_id' => $item->id,
        ]);

        $file = UploadedFile::fake()->create('sample.pdf', 100, 'application/pdf');

        $this->actingAs($buyer);

        $response = $this->from("/trades/{$purchase->id}")
            ->post("/trades/{$purchase->id}/messages", [
                'body' => '画像付きメッセージ',
                'image' => $file,
            ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'image' => '「.png」または「.jpeg」形式でアップロードしてください',
        ]);
    }
}
