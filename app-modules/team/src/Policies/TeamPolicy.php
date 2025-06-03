<?php

namespace Modules\Team\Policies;

use App\Models\User;
use Modules\Team\Models\Team;

class TeamPolicy
{

    public function setCurrent(User $user, Team $team)
    {
        return $user->teams->contains($team);
    }

    public function update(User $user, Team $team)
    {
        if (!$user->teams->contains($team)) {
            return false;
        }

        return $user->can('update team');
    }
}
