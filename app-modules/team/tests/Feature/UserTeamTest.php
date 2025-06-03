<?php

declare(strict_types=1);

use App\Models\User;
use Modules\Team\Models\Team;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;

it('creates team when user is created', function () {
    $user = User::factory()->create([
        'name' => 'berting',
    ]);

    expect($user->teams)
        ->count()->toBe(1);

});

it('removes team when user is deleted', function () {
    $user = User::factory()->create();

    $team = Team::factory()->create();
    $user->teams()->attach($team);

    $user->delete();

    assertDatabaseEmpty('team_user');

});

it('sets the current team to the personal team', function () {

    $user = User::factory()->create([
        'name' => 'Adrian',
    ]);

    expect($user->current_team_id)
        ->toBe($user->teams->first()->id);

});

it('switches the current team for the user', function () {

    $user = User::factory()->create([
        'name' => 'Adrian',
    ]);

    $user->teams()->attach($team = Team::factory()->create());

    $this->actingAs($user)
        ->patch(route('module.team.set-current', $team))
        ->assertRedirect();

    expect($user->fresh()->currentTeam->id)->toBe($team->id);
});

it('cannot switch to team that user does not belong to', function () {
    $user = User::factory()->create();

    $anotherTeam = Team::factory()->create();

    actingAs($user)
        ->patch(route('module.team.set-current', $anotherTeam))
    ->assertForbidden();

    expect($user->currentTeam->id)->not->toBe($anotherTeam->id);

});

it('can update team', function () {

    $user = User::factory()->create();


    actingAs($user)
        ->patch(route('module.team.update', $user->currentTeam), [
            'name' => $name = 'Adrian',
        ])
        ->assertRedirect();

    expect($user->fresh()->currentTeam->name)->toBe($name);

});

it('cannot update if not in team', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();


    actingAs($user)
        ->patch(route('module.team.update', $anotherUser->currentTeam), [
            'name' => 'Burkashing'
        ])
    ->assertForbidden();
});

it('gives the admin role to the personal team', function () {

    $user = User::factory()->create();

    expect($user->hasRole('team admin'))->toBeTrue();

});
