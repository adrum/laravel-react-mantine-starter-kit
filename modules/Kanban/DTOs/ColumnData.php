<?php

namespace Module\Kanban\DTOs;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ColumnData extends Data
{
    public function __construct(
        public string $title,
        public BoardData $boardData
    ) {
    }
}
