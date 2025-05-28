<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Module\Kanban\Models\Column;

final class CreateColumn
{
    public function handle(array $data): Column
    {
        $lastOrder = Board::find($data['board_id'])->columns()->reorder()->orderByDesc('order')->first()?->order ?? 1;
        return Column::create($data + ['order' => ++$lastOrder]);
    }
}
