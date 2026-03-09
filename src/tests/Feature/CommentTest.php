<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Item;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_comment_01_authenticated_user_can_post_comment(): void
    {
        $user = User::factory()->create();

        $item = Item::factory()->create();

        $this->actingAs($user);

        $response = $this->post("/item/{$item->id}/comment", [
            'body' => 'テストコメントです',
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('comments', [
            'user_id' => $user->id,
            'item_id' => $item->id,
            'body' => 'テストコメントです',
        ]);
    }

    public function test_comment_02_guest_cannot_post_comment(): void
    {
        $item = \App\Models\Item::factory()->create();

        $response = $this->post("/item/{$item->id}/comment", [
            'body' => 'ゲストコメント',
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/login');

        $this->assertDatabaseMissing('comments', [
            'item_id' => $item->id,
            'body' => 'ゲストコメント',
        ]);
    }

    public function test_comment_03_body_required_validation_message_is_shown(): void
    {
        $user = \App\Models\User::factory()->create();
        $item = \App\Models\Item::factory()->create();

        $this->actingAs($user);

        $response = $this->post("/item/{$item->id}/comment", [
            'body' => '',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'body' => 'コメントを入力してください',
        ]);

        $this->assertDatabaseMissing('comments', [
            'item_id' => $item->id,
            'body' => '',
        ]);
    }

    public function test_comment_04_body_max_255_validation_is_shown(): void
    {
        $user = \App\Models\User::factory()->create();
        $item = \App\Models\Item::factory()->create();

        $this->actingAs($user);

        $tooLongBody = str_repeat('a', 256);

        $response = $this->post("/item/{$item->id}/comment", [
            'body' => $tooLongBody,
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'body' => 'コメントは255文字以内で入力してください',
        ]);

        $this->assertDatabaseMissing('comments', [
            'item_id' => $item->id,
            'body' => '',
        ]);
    }
}
