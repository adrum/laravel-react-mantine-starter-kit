<?php

declare(strict_types=1);

use SocialiteUi\Features;
use SocialiteUi\Providers;

return [
    'guard' => 'web', // used if Fortify is not installed
    'middleware' => ['web'],
    'providers' => [
        Providers::google(),
        Providers::facebook(),
        Providers::github(),
        Providers::x(),
    ],
    'features' => [
        Features::rememberSession(),
        Features::globalLogin(),
        Features::generateMissingEmails(),
        Features::refreshOAuthTokens(),
        Features::createAccountOnFirstLogin(),
        // Features::authExistingUnlinkedUsers(),
    ],
    'home' => '/dashboard',
];
