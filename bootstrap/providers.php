<?php

declare(strict_types=1);

use BezhanSalleh\FilamentShield\FilamentShieldServiceProvider;
use Spatie\Permission\PermissionServiceProvider;

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\Filament\AdminPanelProvider::class,
    App\Providers\SocialiteUiServiceProvider::class,
    SocialiteUi\SocialiteUiServiceProvider::class,
    FilamentShieldServiceProvider::class,
    PermissionServiceProvider::class
];
