<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;

final class DeleteBoard
{
    public function handle(int|string $id): void
    {
        $board = Board::find($id);

        foreach ($board->columns as $column) {
            $column->cards()->delete();
        }

        $board->columns()->delete();
        $board->delete();
    }
}
