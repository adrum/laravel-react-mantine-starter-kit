<?php

namespace Module\Kanban\DTOs;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class BoardData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
    ) {
    }
}
