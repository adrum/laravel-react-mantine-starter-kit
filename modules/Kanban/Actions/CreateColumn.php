<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Column;

final class CreateColumn
{
    public function handle(array $data): Column
    {
        return Column::create($data);
    }
}
