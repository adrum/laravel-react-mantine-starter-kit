<?php

declare(strict_types=1);

use BezhanSalleh\FilamentShield\FilamentShieldServiceProvider;

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\Filament\AdminPanelProvider::class,
    App\Providers\SocialiteUiServiceProvider::class,
    SocialiteUi\SocialiteUiServiceProvider::class,
    FilamentShieldServiceProvider::class,
];
