
<?php

use App\Models\User;
use App\Policies\UserPolicy;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    $permissions = [
        'view_any_user',
        'view_user',
        'create_user',
        'update_user',
        'delete_user',
        'delete_any_user',
        'force_delete_any_user',
        'restore_user',
        'restore_any_user',
        'replicate_user',
        'reorder_user',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    $this->adminUser = User::factory()->create();
    $this->regularUser = User::factory()->create();

    $this->adminUser->givePermissionTo($permissions);
});

it('allows users with proper permission to view any roles', function () {
    $policy = new UserPolicy();

    expect($policy->viewAny($this->adminUser))->toBeTrue();

    expect($policy->viewAny($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to view specific role', function () {
    $policy = new UserPolicy();

    expect($policy->view($this->adminUser))->toBeTrue();

    expect($policy->view($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to create roles', function () {
    $policy = new UserPolicy();

    expect($policy->create($this->adminUser))->toBeTrue();

    expect($policy->create($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to update roles', function () {
    $policy = new UserPolicy();

    expect($policy->update($this->adminUser))->toBeTrue();

    expect($policy->update($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete roles', function () {
    $policy = new UserPolicy();

    expect($policy->delete($this->adminUser))->toBeTrue();

    expect($policy->delete($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete any roles', function () {
    $policy = new UserPolicy();

    expect($policy->deleteAny($this->adminUser))->toBeTrue();

    expect($policy->deleteAny($this->regularUser))->toBeFalse();
});
