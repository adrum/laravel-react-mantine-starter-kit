<?php

declare(strict_types=1);

use Illuminate\Support\Arr;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\get;

it('contains a list of available languages', function () {

    get('/')->assertInertia(function (AssertableInertia $page) {
        $page->where('languages.0.value', 'en')
            ->where('languages.0.label', 'English');

    });

});

it('contains the current selected language', function () {

    app()->setLocale('en_PH');

    get('/')->assertInertia(function (AssertableInertia $page) {
        $page->where('language', 'en_PH');

    });

});

it('sets the language', function () {

    $response = $this->post('/language',
        ['locale' => $language = 'en_PH',
        ]
    );

    $response
        ->assertSessionHas('language', $language)
        ->assertStatus(302);
});

it('sets the default language if chosen language is invalid', function () {

    $response = $this->post('/language',
        ['locale' => $language = 'nl',
        ]
    );

    $response
        ->assertSessionHas('language', config('app.locale'))
        ->assertStatus(302);
});

it('contains all translations', function () {

    app()->setLocale('en');
    $this->get('/')
        ->assertInertia(function (AssertableInertia $page) {

            expect(Arr::get($page->toArray(), 'props.translations'))->toMatchArray([

                'general.welcome_message' => 'Welcome to SassyKit',
            ]);

        });

});
