<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('boards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });

        Schema::create('columns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('board_id')->constrained();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('content')->nullable();
            $table->integer('order')->default(0);
            $table->foreignId('column_id')->constrained();
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('seo');
    }
};
