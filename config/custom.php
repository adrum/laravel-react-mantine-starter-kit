<?php

declare(strict_types=1);

use App\Enums\Feature;

return [
    'features' => [
        Feature::Teams
    ],
    'socials' => [
        'github' => env('SOCIAL_GITHUB', false),
        'x' => env('SOCIAL_X', false),
        'facebook' => env('SOCIAL_FACEBOOK', false),
        'google' => env('SOCIAL_GOOGLE', false),
    ],
];
