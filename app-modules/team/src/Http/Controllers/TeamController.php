<?php

declare(strict_types=1);

namespace Modules\Team\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Modules\Team\DTOs\TeamData;
use Modules\Team\Http\Requests\SetCurrentTeamRequest;
use Modules\Team\Http\Requests\TeamLeaveRequest;
use Modules\Team\Http\Requests\TeamUpdateRequest;
use Modules\Team\Models\Team;

final class TeamController
{
    public function index(Request $request)
    {
        return inertia()->render('team::index', [
            'current_team' => TeamData::from($request->user()->currentTeam()->with('members')->first()),
        ]);
    }

    public function update(TeamUpdateRequest $request, Team $team)
    {

        $team->update($request->validated());

        return back()->with('success', 'Team updated.');
    }

    public function setCurrent(SetCurrentTeamRequest $request, Team $team)
    {
        $user = $request->user()->currentTeam()->associate($team)->save();

        return back()->with('success', 'Team updated.');
    }

    public function leave(TeamLeaveRequest $request, Team $team)
    {
        $user = $request->user();

        $user->teams()->detach($team);

        $user->currentTeam()->associate($user->fresh()->teams()->first())->save();

        return redirect()->route('dashboard');
    }
}
