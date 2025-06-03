<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use App\Support\InertiaSharedData;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Subscription;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Request::macro('wantsModal', function () {
            return $this->header('X-Modal') ? true : false;
        });


       $this->app->bind(InertiaSharedData::class, fn () => new InertiaSharedData());
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

        Gate::define('viewLogViewer', fn (User $user): bool => $user->hasRole('super_admin'));

        Cashier::useSubscriptionModel(Subscription::class);
    }
}
