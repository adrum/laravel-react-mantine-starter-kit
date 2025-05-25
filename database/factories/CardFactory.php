<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\kanban\Models\Card;
use Modules\kanban\Models\Column;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialAccount>
 */
final class CardFactory extends Factory
{
    protected $model = Card::class;

    public function definition(): array
    {
        return [
            'content' => $this->faker->title,
            'position' => $this->faker->numberBetween(0, 100),
            'column_id' => Column::factory()->create()->id,
        ];
    }
}
