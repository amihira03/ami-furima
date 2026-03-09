<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_01_email_required(): void
    {
        $response = $this->post('/login', [
            'email' => '',
            'password' => 'password',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'email' => 'メールアドレスを入力してください',
        ]);
    }
    public function test_login_02_password_required(): void
    {
        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => '',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'password' => 'パスワードを入力してください',
        ]);
    }

    public function test_login_03_invalid_credentials(): void
    {
        $response = $this->post('/login', [
            'email' => 'not-exist_' . uniqid() . '@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'login' => 'ログイン情報が登録されていません',
        ]);
    }

    public function test_login_04_success_verified_redirect_to_top(): void
    {
        $user = \App\Models\User::factory()->create([
            'email' => 'login_' . uniqid() . '@example.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticatedAs($user);
    }

    public function test_login_05_success_unverified_redirect_to_verify_notice(): void
    {
        $user = \App\Models\User::factory()->create([
            'email' => 'login_' . uniqid() . '@example.com',
            'password' => bcrypt('password'),
            'email_verified_at' => null,
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect('/email/verify-notice');
        $this->assertAuthenticatedAs($user);
    }
}
