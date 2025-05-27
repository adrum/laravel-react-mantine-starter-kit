<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;

final class CreateBoard
{
    public function handle(array $data)
    {
        Board::create($data);
    }
}
