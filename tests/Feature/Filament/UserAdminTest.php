<?php

declare(strict_types=1);

use App\Filament\Resources\UserResource\Pages\CreateUser;
use App\Filament\Resources\UserResource\Pages\ListUsers;
use App\Models\User;

use function Pest\Livewire\livewire;

it('can render user page', function () {

    adminAuth();

    livewire(ListUsers::class)->assertSuccessful();
});

it('can create user', function () {

    adminAuth();

    $lv = livewire(CreateUser::class)->fillForm([
        'name' => 'test',
        'email' => 'test@yahoo.com',
    ])->assertFormSet([
        'name' => 'test',
        'email' => 'test@yahoo.com',
    ])->call('create')->assertHasNoFormErrors();

    $latestUser = User::where('name', 'test')->first();
    expect($latestUser->name)->toBe('test');
});
