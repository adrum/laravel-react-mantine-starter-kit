<?php

declare(strict_types=1);

namespace Modules\Team\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class TeamModuleData extends Data
{
    public function __construct(
        public bool $has_team,
        /** @var \Modules\Team\DTOs\TeamData[] */
        public DataCollection $teams,
        public TeamData $current_team,
    ) {}
}
