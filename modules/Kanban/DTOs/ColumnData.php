<?php

declare(strict_types=1);

namespace Module\Kanban\DTOs;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class ColumnData extends Data
{
    public function __construct(
        public string $title,
        public BoardData $boardData
    ) {}
}
