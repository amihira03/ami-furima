<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileEditTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_edit_01_initial_values_are_displayed(): void
    {
        $user = User::factory()->create([
            'name' => '初期値テストユーザー',
            'profile_image_path' => 'profiles/test.jpg',
            'postal_code' => '123-4567',
            'address' => '大阪府テスト市1-2-3',
            'building' => 'テストマンション101',
        ]);

        $this->actingAs($user);

        $response = $this->get('/mypage/profile');

        $response->assertStatus(200);

        $response->assertSee('初期値テストユーザー');
        $response->assertSee('123-4567');
        $response->assertSee('大阪府テスト市1-2-3');
        $response->assertSee('テストマンション101');

        $response->assertSee('profiles/test.jpg');
    }
}
