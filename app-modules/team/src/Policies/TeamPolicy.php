<?php

declare(strict_types=1);

namespace Modules\Team\Policies;

use App\Models\User;
use Modules\Team\Models\Team;

final class TeamPolicy
{
    public function setCurrent(User $user, Team $team)
    {
        return $user->teams->contains($team);
    }

    public function update(User $user, Team $team)
    {
        if (! $user->teams->contains($team)) {
            return false;
        }

        return $user->can('update team');
    }

    public function leave(User $user, Team $team)
    {
        if (! $user->teams->contains($team)) {
            return false;
        }

        return $user->teams->count() >= 2;
    }

    public function removeTeamMember(User $user, Team $team, User $member)
    {
        if ($user->id == $member->id) {
            return false;
        }


        if ($team->members->doesntContain($member)) {
            return false;
        }


        return $user->can('remove team members');

    }
}
