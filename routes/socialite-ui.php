<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use SocialiteUi\Http\Controllers\OAuthController;

Route::group([
    'prefix' => config('socialite-ui.prefix', config('socialite-ui.path')),
    'middleware' => config('socialite-ui.middleware', ['web']),
], function () {
    Route::get('/oauth/confirm', [OAuthController::class, 'prompt'])->name('oauth.confirm.show');
    Route::post('/oauth/confirm', [OAuthController::class, 'confirm'])->name(
        'oauth.confirm'
    );

    Route::get('/oauth/{provider}', [OAuthController::class, 'redirect'])->name('oauth.redirect');
    Route::match(['get', 'post'], '/oauth/{provider}/callback', [OAuthController::class, 'callback'])->name('oauth.callback');
});
