<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use SocialiteUi\Enums\Provider;
use SocialiteUi\SocialiteUi;

final class SocialiteUiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        SocialiteUi::promptOAuthLinkUsing(fn (Provider $provider) => Inertia::render('auth/confirm-link-account', [
            'provider' => $provider->toArray(),
        ]));
    }
}
