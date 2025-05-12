<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SocialAccount;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use SocialiteUi\Providers;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialAccount>
 */
final class SocialAccountFactory extends Factory
{
    protected $model = SocialAccount::class;

    public function definition(): array
    {
        return [
            'provider' => $this->faker->randomElement(Providers::all()),
            'provider_id' => $this->faker->numerify('########'),
            'token' => Str::random(432),
            'refresh_token' => Str::random(432),
        ];
    }
}
