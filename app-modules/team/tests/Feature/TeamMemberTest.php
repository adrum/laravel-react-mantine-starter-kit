<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Modules\Team\Http\Middleware\TeamsPermission;

use function Pest\Laravel\actingAs;

it('should show a list of members', function () {
    $user = User::factory()->create();

    $user->currentTeam->members()->attach(
        $members = User::factory()->count(3)->create()
    );

    actingAs($user)
        ->get(route('module.team.index'))
        ->assertOk()
        ->assertInertia(function (AssertableInertia $page) {
            $page->has('current_team.members', 4);
        });
});

it('can remove a member', function () {

    $user = User::factory()->create();

    $user->currentTeam->members()->attach(
        $member = User::factory()->create()
    );


    setPermissionsTeamId($user->currentTeam->id);

    $member->currentTeam()->associate($user->currentTeam)->save();
    $member->assignRole('team admin');

    actingAs($user)
        ->delete(route('module.team-member.delete', [
            $user->currentTeam,
            $member,
        ]))
        ->assertRedirect();

    expect($user->fresh()->currentTeam->members->contains($member))->toBeFalse()
        ->and($member->fresh()->current_team_id)->not->toEqual($user->currentTeam->id);

});

it('can not remove a member from the team without permission', function () {

    $user = User::factory()->create();

    $anotherUser = User::factory()->create();

    $user->currentTeam->members()->attach(
        $member = User::factory()->create()
    );

    setPermissionsTeamId($user->currentTeam->id);

    actingAs($anotherUser)
        ->withoutMiddleware(TeamsPermission::class)
        ->delete(route('module.team-member.delete', [ $user->currentTeam, $member ]))
        ->assertForbidden()
    ;
});


it('cannot remove self from team', function () {

    $user = User::factory()->create();


    actingAs($user)
        ->delete(route('module.team-member.delete', [ $user->currentTeam, $user ]))
        ->assertForbidden()
    ;


});
