<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;

final class DeleteColumn
{
    public function handle(array $data): void
    {
        $board = Board::find($data['board_id']);
        $column = $board->columns()->where('title', $data['column_id'])->first();

        if (!$column) {
            return;
        }

        if ($column->cards()->count() > 0) {
            $column->cards()->delete();
        }

        $column->delete();
    }
}
