<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropConditionColumnFromItemsTable extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('condition');
        });
    }

    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('condition', 50);
        });
    }
}
