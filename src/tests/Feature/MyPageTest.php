<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MyPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_mypage_01_displays_profile_image_username_sell_items_and_buy_items(): void
    {
        $user = User::factory()->create([
            'name' => 'マイページ表示テストユーザー',
            'profile_image_path' => 'profiles/test.jpg',
        ]);

        $sellItem = Item::factory()->create([
            'user_id' => $user->id,
            'name' => '出品テスト商品',
        ]);

        $seller = User::factory()->create();
        $buyItem = Item::factory()->create([
            'user_id' => $seller->id,
            'name' => '購入テスト商品',
        ]);

        Purchase::factory()->create([
            'user_id' => $user->id,
            'item_id' => $buyItem->id,
            'payment_method' => 'card',
        ]);

        $this->actingAs($user);

        $sellPage = $this->get('/mypage?page=sell');
        $sellPage->assertStatus(200);
        $sellPage->assertSee('マイページ表示テストユーザー');
        $sellPage->assertSee('出品テスト商品');

        $sellPage->assertSee('profiles/test.jpg');

        $buyPage = $this->get('/mypage?page=buy');
        $buyPage->assertStatus(200);
        $buyPage->assertSee('マイページ表示テストユーザー');
        $buyPage->assertSee('購入テスト商品');

        $buyPage->assertSee('profiles/test.jpg');
    }
}
