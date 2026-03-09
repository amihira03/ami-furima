<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_01_name_required(): void
    {
        $response = $this->post('/register', [
            'name' => '',
            'email' => 'test_' . uniqid() . '@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors(['name']);

        $response->assertSessionHasErrors([
            'name' => 'お名前を入力してください',
        ]);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_register_02_email_required(): void
    {
        $response = $this->post('/register', [
            'name' => 'テスト太郎',
            'email' => '',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'email' => 'メールアドレスを入力してください',
        ]);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_register_03_password_required(): void
    {
        $response = $this->post('/register', [
            'name' => 'テスト太郎',
            'email' => 'test_' . uniqid() . '@example.com',
            'password' => '',
            'password_confirmation' => '',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'password' => 'パスワードを入力してください',
        ]);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_register_04_password_min_8(): void
    {
        $response = $this->post('/register', [
            'name' => 'テスト太郎',
            'email' => 'test_' . uniqid() . '@example.com',
            'password' => '1234567',
            'password_confirmation' => '1234567',
        ]);

        $response->assertStatus(302);

        $response->assertSessionHasErrors([
            'password' => 'パスワードは8文字以上で入力してください',
        ]);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_register_06_success_redirect_to_verify_notice(): void
    {
        $email = 'test_' . uniqid() . '@example.com';

        $response = $this->post('/register', [
            'name' => 'テスト太郎',
            'email' => $email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertRedirect('/email/verify-notice');

        $this->assertDatabaseHas('users', [
            'email' => $email,
            'name' => 'テスト太郎',
        ]);
    }
}
