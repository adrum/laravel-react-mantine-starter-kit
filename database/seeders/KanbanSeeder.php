<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Module\Kanban\Models\Card as ModelsCard;

final class KanbanSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        ModelsCard::factory()->times(5)->create();
    }
}
