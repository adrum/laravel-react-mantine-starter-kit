<?php

declare(strict_types=1);

namespace App\Support;

use Closure;

final class InertiaSharedData
{
    private array $shared = [];

    public function share(string $key, Closure|string|array $value): void
    {
        $this->shared[$key] = $value;
    }

    public function all(): array
    {
        return collect($this->shared)->map(fn ($value) => $value instanceof Closure ? $value() : $value
        )->toArray();
    }
}
