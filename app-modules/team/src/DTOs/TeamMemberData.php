<?php

declare(strict_types=1);

namespace Modules\Team\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class TeamMemberData extends Data
{

    public function __construct(
        public int $id,
        public string $name,
        public string $role,
        public string $email,
        public string $avatar_url
    ) {}
}
