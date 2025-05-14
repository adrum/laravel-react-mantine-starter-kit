<?php

declare(strict_types=1);

use App\Models\User;
use App\Policies\LogPolicy;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    $permissions = [
        'view_log',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    $this->adminUser = User::factory()->create();
    $this->regularUser = User::factory()->create();

    $this->adminUser->givePermissionTo($permissions);
});

it('allows users with proper permission to view log', function () {
    $policy = new LogPolicy();

    expect($policy->view($this->adminUser))->toBeTrue();
    expect($policy->view($this->regularUser))->toBeFalse();
});
