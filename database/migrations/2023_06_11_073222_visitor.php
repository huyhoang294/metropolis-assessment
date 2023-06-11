<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('visitors', function (Blueprint $table) {
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->boolean('has_vehicle')->default(false);
            $table->string('purpose_of_visiting');
            $table->timestamp('check_out')->nullable();
            $table->timestamp('check_in')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
