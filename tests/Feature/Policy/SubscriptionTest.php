
<?php

use App\Models\User;
use App\Policies\SubscriptionPolicy;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    $permissions = [
        'view_any_subscription',
        'view_subscription',
        'create_subscription',
        'update_subscription',
        'delete_subscription',
        'delete_any_subscription',
        'force_delete_any_subscription',
        'restore_subscription',
        'restore_any_subscription',
        'replicate_subscription',
        'reorder_subscription',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    $this->adminUser = User::factory()->create();
    $this->regularUser = User::factory()->create();

    $this->adminUser->givePermissionTo($permissions);
});

it('allows users with proper permission to view any roles', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->viewAny($this->adminUser))->toBeTrue();

    expect($policy->viewAny($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to view specific role', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->view($this->adminUser))->toBeTrue();

    expect($policy->view($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to create roles', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->create($this->adminUser))->toBeTrue();

    expect($policy->create($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to update roles', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->update($this->adminUser))->toBeTrue();

    expect($policy->update($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete roles', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->delete($this->adminUser))->toBeTrue();

    expect($policy->delete($this->regularUser))->toBeFalse();
});

it('allows users with proper permission to delete any roles', function () {
    $policy = new SubscriptionPolicy();

    expect($policy->deleteAny($this->adminUser))->toBeTrue();

    expect($policy->deleteAny($this->regularUser))->toBeFalse();
});
