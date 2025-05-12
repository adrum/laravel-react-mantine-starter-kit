<?php

declare(strict_types=1);

return [

    NunoMaduro\Essentials\Configurables\ShouldBeStrict::class => true,
    NunoMaduro\Essentials\Configurables\Unguard::class => true,
    NunoMaduro\Essentials\Configurables\AggressivePrefetching::class => true,
    NunoMaduro\Essentials\Configurables\PreventStrayRequests::class => true,
    NunoMaduro\Essentials\Configurables\AutomaticallyEagerLoadRelationships::class => true,
    NunoMaduro\Essentials\Configurables\ImmutableDates::class => true,
    NunoMaduro\Essentials\Configurables\FakeSleep::class => true,
];
