<?php

namespace Tests\Feature;

use App\Models\Evaluation;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MyPageRatingTest extends TestCase
{
    use RefreshDatabase;

    public function test_rating_01_average_is_displayed(): void
    {
        $user = User::factory()->create();

        $r1 = User::factory()->create();
        $r2 = User::factory()->create();
        $r3 = User::factory()->create();

        $p1 = Purchase::factory()->create();
        $p2 = Purchase::factory()->create();
        $p3 = Purchase::factory()->create();

        Evaluation::create([
            'purchase_id' => $p1->id,
            'rater_user_id' => $r1->id,
            'rated_user_id' => $user->id,
            'score' => 5,
        ]);

        Evaluation::create([
            'purchase_id' => $p2->id,
            'rater_user_id' => $r2->id,
            'rated_user_id' => $user->id,
            'score' => 4,
        ]);

        Evaluation::create([
            'purchase_id' => $p3->id,
            'rater_user_id' => $r3->id,
            'rated_user_id' => $user->id,
            'score' => 4,
        ]);

        $response = $this->actingAs($user)->get('/mypage');

        $html = $response->getContent();

        $this->assertEquals(
            4,
            substr_count($html, 'mypage-profile-star is-active')
        );
    }

    public function test_rating_02_not_displayed_when_no_evaluations(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/mypage');

        $html = $response->getContent();

        $this->assertEquals(
            0,
            substr_count($html, 'mypage-profile-star is-active')
        );
    }

    public function test_rating_03_is_rounded(): void
    {
        $user = User::factory()->create();

        $r1 = User::factory()->create();
        $r2 = User::factory()->create();
        $r3 = User::factory()->create();

        $p1 = Purchase::factory()->create();
        $p2 = Purchase::factory()->create();
        $p3 = Purchase::factory()->create();

        Evaluation::create([
            'purchase_id' => $p1->id,
            'rater_user_id' => $r1->id,
            'rated_user_id' => $user->id,
            'score' => 5,
        ]);

        Evaluation::create([
            'purchase_id' => $p2->id,
            'rater_user_id' => $r2->id,
            'rated_user_id' => $user->id,
            'score' => 5,
        ]);

        Evaluation::create([
            'purchase_id' => $p3->id,
            'rater_user_id' => $r3->id,
            'rated_user_id' => $user->id,
            'score' => 4,
        ]);

        $response = $this->actingAs($user)->get('/mypage');

        $html = $response->getContent();

        $this->assertEquals(
            5,
            substr_count($html, 'mypage-profile-star is-active')
        );
    }
}
