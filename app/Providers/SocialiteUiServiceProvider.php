<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use SocialiteUi\Enums\Provider;
use SocialiteUi\SocialiteUi;

class SocialiteUiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        SocialiteUi::promptOAuthLinkUsing(function (Provider $provider) {
            return Inertia::render('auth/confirm-link-account', [
                'provider' => $provider->toArray(),
            ]);
        });
    }
}

