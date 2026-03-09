<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Item;
use App\Models\Like;
use App\Models\User;
use App\Models\Condition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_item_show_01_displays_required_information(): void
    {
        $seller = User::factory()->create();
        $viewer = User::factory()->create();

        $condition = Condition::create(['name' => '良好']);

        $item = Item::factory()->create([
            'user_id' => $seller->id,
            'condition_id' => $condition->id,
            'name' => '詳細テスト商品',
            'brand_name' => 'テストブランド',
            'description' => 'これは詳細ページの説明文です。',
            'price' => 12345,
            'image_path' => 'items/test.jpg',
        ]);

        $cat1 = Category::factory()->create(['name' => 'ファッション']);
        $cat2 = Category::factory()->create(['name' => 'メンズ']);
        $item->categories()->attach([$cat1->id, $cat2->id]);

        Like::factory()->create(['user_id' => $viewer->id, 'item_id' => $item->id]);
        Like::factory()->create(['user_id' => User::factory()->create()->id, 'item_id' => $item->id]);

        $commenter = User::factory()->create(['name' => 'コメント太郎']);
        Comment::factory()->create([
            'user_id' => $commenter->id,
            'item_id' => $item->id,
            'body' => 'テストコメント本文',
        ]);

        $response = $this->get('/item/' . $item->id);

        $response->assertStatus(200);

        $response->assertSee('詳細テスト商品');
        $response->assertSee('テストブランド');
        $response->assertSee('これは詳細ページの説明文です。');

        $response->assertSee('12,345');

        $response->assertSee('items/test.jpg');

        $response->assertSee('ファッション');
        $response->assertSee('メンズ');

        $response->assertSee('良好');

        $response->assertSee('コメント');
        $response->assertSee('（1）');

        $response->assertSee('コメント太郎');
        $response->assertSee('テストコメント本文');
    }

    public function test_item_show_02_displays_multiple_categories(): void
    {
        $seller = \App\Models\User::factory()->create();

        $condition = Condition::create(['name' => '良好']);

        $item = Item::factory()->create([
            'user_id' => $seller->id,
            'condition_id' => $condition->id,
            'name' => 'カテゴリ確認商品',
        ]);

        $category1 = \App\Models\Category::factory()->create(['name' => 'ファッション']);
        $category2 = \App\Models\Category::factory()->create(['name' => 'メンズ']);

        $item->categories()->attach([$category1->id, $category2->id]);

        $response = $this->get('/item/' . $item->id);

        $response->assertStatus(200);

        $response->assertSee('ファッション');
        $response->assertSee('メンズ');
    }
}
