<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use App\Models\Condition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SellStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_sell_01_item_can_be_stored(): void
    {
        Storage::fake('public');

        $seller = User::factory()->create([
            'name' => '出品テストユーザー',
            'email' => 'seller_' . uniqid() . '@example.com',
        ]);

        $category1 = Category::factory()->create(['name' => 'ファッション']);
        $category2 = Category::factory()->create(['name' => 'メンズ']);

        $image = UploadedFile::fake()->create('item.jpg', 100, 'image/jpeg');

        $this->actingAs($seller);

        $condition = Condition::create(['name' => '良好']);

        $response = $this->post('/sell', [
            'name' => '出品テスト商品',
            'brand_name' => 'テストブランド',
            'description' => 'これは出品テストの説明です。',
            'price' => 12345,
            'condition_id' => $condition->id,
            'categories' => [$category1->id, $category2->id],
            'image' => $image,
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('items', [
            'user_id' => $seller->id,
            'name' => '出品テスト商品',
            'brand_name' => 'テストブランド',
            'description' => 'これは出品テストの説明です。',
            'price' => 12345,
            'condition_id' => $condition->id,
        ]);

        $item = Item::where('name', '出品テスト商品')->firstOrFail();

        $this->assertDatabaseHas('category_items', [
            'item_id' => $item->id,
            'category_id' => $category1->id,
        ]);

        $this->assertDatabaseHas('category_items', [
            'item_id' => $item->id,
            'category_id' => $category2->id,
        ]);

        Storage::disk('public')->assertExists('items/' . $image->hashName());
    }
}
