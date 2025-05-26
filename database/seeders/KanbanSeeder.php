<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Kanban\Models\Card;

final class KanbanSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Card::factory()->times(5)->create();
    }
}
