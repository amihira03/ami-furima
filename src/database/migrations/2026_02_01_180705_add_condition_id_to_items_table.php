<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConditionIdToItemsTable extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->foreignId('condition_id')
                ->nullable()
                ->constrained('conditions')
                ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropConstrainedForeignId('condition_id');
        });
    }
}
