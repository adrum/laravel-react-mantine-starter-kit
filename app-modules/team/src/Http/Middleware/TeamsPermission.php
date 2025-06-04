<?php

namespace Modules\Team\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamsPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($user = auth()->user()) {
            abort_unless($user->teams->contains($user->currentTeam), 403);

            setPermissionsTeamId($user->currentTeam->id);
        }

        return $next($request);
    }

}
