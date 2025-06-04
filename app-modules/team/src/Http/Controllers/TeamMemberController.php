<?php

declare(strict_types=1);

namespace Modules\Team\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Modules\Team\DTOs\TeamData;
use Modules\Team\Http\Requests\SetCurrentTeamRequest;
use Modules\Team\Http\Requests\TeamLeaveRequest;
use Modules\Team\Http\Requests\TeamMemberDestroyRequest;
use Modules\Team\Http\Requests\TeamUpdateRequest;
use Modules\Team\Models\Team;

final class TeamMemberController
{
    public function destroy(TeamMemberDestroyRequest $request, Team $team, User $user)
    {
        $team->members()->detach($user);

        $user->currentTeam()->associate($user->teams()->first())->save();
        $user->roles()->detach();

        return back()->with('success', 'Member deleted.');
    }


}
