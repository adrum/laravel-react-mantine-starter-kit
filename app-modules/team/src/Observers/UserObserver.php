<?php


namespace Modules\Team\Observers;

use App\Models\User;
use Modules\Team\Models\Team;

class UserObserver
{
    public function created(User $user)
    {
        $team = Team::create([
            'name' => $user->name
        ]);

        if ($team) {
            $user->teams()->attach($team);

            $user->currentTeam()->associate($team);
            $user->save();

            setPermissionsTeamId($team->id);
            $user->assignRole('team admin');
        }
    }

    public function deleting(User $user)
    {
        $user->teams()->detach();
    }
}

