<?php

declare(strict_types=1);

namespace Modules\Team\DTOs;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class TeamData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}
}
