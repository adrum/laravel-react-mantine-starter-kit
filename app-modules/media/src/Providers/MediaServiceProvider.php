<?php

declare(strict_types=1);

namespace Modules\Media\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Media\Contracts\MediaRepositoryInterface;
use Modules\Media\Repositories\MediaRepository;

final class MediaServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(MediaRepositoryInterface::class, MediaRepository::class);
    }

    public function boot(): void {
    }
}
