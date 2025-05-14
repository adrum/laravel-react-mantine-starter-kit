<?php

declare(strict_types=1);

use App\Models\User;
use App\Policies\RolePolicy;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    $permissions = [
        'view_any_role',
        'view_role',
        'create_role',
        'update_role',
        'delete_role',
        'delete_any_role',
        'force_delete_role',
        'force_delete_any_role',
        'restore_role',
        'restore_any_role',
        'replicate_role',
        'reorder_role',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    $this->adminUser = User::factory()->create();
    $this->regularUser = User::factory()->create();

    $this->adminUser->givePermissionTo($permissions);
});

it('allows users with proper permission to view any roles', function () {
    $policy = new RolePolicy();

    expect($policy->viewAny($this->adminUser))->toBeTrue();

    expect($policy->viewAny($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to view specific role', function () {
    $policy = new RolePolicy();

    expect($policy->view($this->adminUser))->toBeTrue();

    expect($policy->view($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to create roles', function () {
    $policy = new RolePolicy();

    expect($policy->create($this->adminUser))->toBeTrue();

    expect($policy->create($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to update roles', function () {
    $policy = new RolePolicy();

    expect($policy->update($this->adminUser))->toBeTrue();

    expect($policy->update($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete roles', function () {
    $policy = new RolePolicy();

    expect($policy->delete($this->adminUser))->toBeTrue();

    expect($policy->delete($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete any roles', function () {
    $policy = new RolePolicy();

    expect($policy->deleteAny($this->adminUser))->toBeTrue();

    expect($policy->deleteAny($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to force delete roles', function () {
    $this->adminUser->givePermissionTo('force_delete_role');

    $policy = new RolePolicy();
    expect($policy->forceDelete($this->adminUser))->toBeFalse();
});
