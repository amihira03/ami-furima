<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->timestamp('buyer_completed_at')->nullable()->after('payment_method');
            $table->timestamp('seller_completed_at')->nullable()->after('buyer_completed_at');
        });
    }

    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->dropColumn(['buyer_completed_at', 'seller_completed_at']);
        });
    }
};
