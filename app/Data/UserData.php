<?php

declare(strict_types=1);

namespace App\Data;

use Modules\Team\DTOs\TeamData;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public TeamData $currentTeam
    ) {}
}
