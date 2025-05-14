<?php

declare(strict_types=1);

use App\Filament\Resources\RoleResource\Pages\CreateRole;
use BezhanSalleh\FilamentShield\Resources\RoleResource\Pages\ListRoles;

use function Pest\Livewire\livewire;

it('can render page', function () {

    adminAuth();

    livewire(ListRoles::class)->assertSuccessful();
});

it('can create role', function () {

    adminAuth();

    livewire(CreateRole::class)->fillForm([
        'name' => 'test',
    ])->assertFormSet([
        'name' => 'test',
    ]);
});
