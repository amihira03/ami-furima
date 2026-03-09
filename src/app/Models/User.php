<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image_path',
        'postal_code',
        'address',
        'building',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    public function tradeMessages(): HasMany
    {
        return $this->hasMany(TradeMessage::class);
    }

    public function givenEvaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'rater_user_id');
    }

    public function receivedEvaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'rated_user_id');
    }

    public function getRatingAverageAttribute(): ?int
    {
        $avg = $this->receivedEvaluations()->avg('score');

        return $avg !== null ? (int) round($avg) : null;
    }
}
