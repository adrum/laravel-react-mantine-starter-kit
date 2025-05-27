<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Module\Kanban\Models\Card;
use Module\Kanban\Models\Column;

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
