<?php

namespace Modules\Tag\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Tag\Contracts\TagRepositoryInterface;
use Modules\Tag\Repositories\TagRepository;

class TagServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(TagRepositoryInterface::class, TagRepository::class);
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
    }
}

