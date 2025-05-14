<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Subscription;
use Opcodes\LogViewer\Facades\LogViewer;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        if (! app()->isProduction()) {
            URL::forceScheme('http');
        }

        Gate::before(fn (User $user): ?true => $user->hasRole('super_admin') ? true : null);

        LogViewer::auth(fn(Request $request) => $request->user()->hasRole('super_admin'));

        Cashier::useSubscriptionModel(Subscription::class);
    }
}
