<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;

final class UpdateColumnTitle
{
    public function handle(array $data): void
    {
        $board = Board::find($data['board_id']);
        $column = $board->columns()->where('title', $data['column_id']);
        $column->update(['title' => $data['title']]);
    }
}
