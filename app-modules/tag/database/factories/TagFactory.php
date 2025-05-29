<?php

declare(strict_types=1);

namespace Modules\Tag\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Module\Kanban\Models\Board;
use Modules\Tag\Models\Tag;

final class TagFactory extends Factory
{
    protected $model = Tag::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'slug' => $this->faker->slug,
        ];
    }
}
