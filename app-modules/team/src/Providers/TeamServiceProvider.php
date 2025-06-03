<?php

declare(strict_types=1);

namespace Modules\Team\Providers;

use App\Models\User;
use App\Support\InertiaSharedData;
use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;
use Modules\Team\DTOs\TeamData;
use Modules\Team\Models\Team;
use Modules\Team\Observers\UserObserver;

final class TeamServiceProvider extends ServiceProvider
{
    public function register(): void
    {

        /* $this->mergeConfigFrom(__DIR__ . '/../../config/team.php', 'module-team'); */

    }

    public function boot(): void
    {
        User::observe(UserObserver::class);

        User::resolveRelationUsing('teams', function ($userModel) {
            return $userModel->belongsToMany(Team::class, 'team_user', 'user_id', 'team_id')
                ->withTimestamps();
        });

        User::resolveRelationUsing('currentTeam', function ($userModel) {
            return $userModel->belongsTo(Team::class, 'current_team_id');
        });


        App::resolving(InertiaSharedData::class, function (InertiaSharedData $inertia) {
            $inertia->share('module.has_team', fn () => true);

            if (auth()->user()) {

            $inertia->share('module.team.teams', fn () => auth()->check() ?
               TeamData::collect(auth()->user()->teams)
                : []);
            $inertia->share('module.team.current_team', fn () => TeamData::from(auth()->user()?->currentTeam));

            }

        });
    }
}
