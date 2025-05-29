<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->morphs('votable'); // polymorphic relation
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['up', 'down']);
            $table->timestamps();

            $table->unique(['votable_id', 'votable_type', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
