<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\kanban\Models\Board;
use Modules\kanban\Models\Column;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialAccount>
 */
final class ColumnFactory extends Factory
{
    protected $model = Column::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->title,
            'board_id' => Board::factory()->create()->id,
        ];
    }
}
