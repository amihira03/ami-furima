<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_item_index_01_show_all_items(): void
    {
        $sellerA = User::factory()->create();
        $sellerB = User::factory()->create();

        $item1 = Item::factory()->create(['user_id' => $sellerA->id, 'name' => 'テスト商品A']);
        $item2 = Item::factory()->create(['user_id' => $sellerA->id, 'name' => 'テスト商品B']);
        $item3 = Item::factory()->create(['user_id' => $sellerB->id, 'name' => 'テスト商品C']);

        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee('テスト商品A');
        $response->assertSee('テスト商品B');
        $response->assertSee('テスト商品C');
    }

    public function test_item_index_02_purchased_item_shows_sold_label(): void
    {
        $seller = \App\Models\User::factory()->create();

        $item = \App\Models\Item::factory()->create([
            'user_id' => $seller->id,
            'name' => '購入済みテスト商品',
        ]);

        \App\Models\Purchase::factory()->create([
            'item_id' => $item->id,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee('購入済みテスト商品');
        $response->assertSee('Sold');
    }

    public function test_item_index_03_my_items_are_not_shown_when_logged_in(): void
    {
        $me = \App\Models\User::factory()->create();

        \App\Models\Item::factory()->create([
            'user_id' => $me->id,
            'name' => '自分の商品',
        ]);

        $other = \App\Models\User::factory()->create();
        \App\Models\Item::factory()->create([
            'user_id' => $other->id,
            'name' => '他人の商品',
        ]);

        $response = $this->actingAs($me)->get('/');

        $response->assertStatus(200);

        $response->assertDontSee('自分の商品');

        $response->assertSee('他人の商品');
    }
}
