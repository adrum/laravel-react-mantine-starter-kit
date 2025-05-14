<?php

declare(strict_types=1);

use App\Http\Middleware\SetLanguage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tests\TestCase;

uses(TestCase::class);

it('sets the chosen locale', function () {

    session()->put('language', 'en_PH');

    (new SetLanguage)->handle(new Request(), function (Request $request) {

        expect(app()->getLocale())->toBe('en_PH');

        return new Response();
    });

});
