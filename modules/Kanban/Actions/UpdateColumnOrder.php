<?php
declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Module\Kanban\Models\Card; // Assuming you have a Card model
use Module\Kanban\Models\Column;

final class UpdateColumnOrder
{
    public function handle(array $data)
    {
        $board = Board::find($data['board_id']);
        foreach ($data['order'] as $index => $cardTitle) {
            $board->columns()->where('title', $cardTitle)->update(['order' => $index + 1]);
        }


        return [
            'success' => true,
            'updated_cards' => count($data['order'])
        ];
    }
}
