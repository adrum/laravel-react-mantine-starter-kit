<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Module\Kanban\Models\Card;

final class UpdateBoardOrder
{
    public function handle(array $data)
    {
        $board = Board::findOrFail($data['board_id']);

        foreach ($data['columns_with_card_ids'] as $columnData) {

            $column = $board->columns()->where('title', $columnData['column_id'])->first();

            if (! $column) {
                continue;
            }

            foreach ($columnData['card_ids'] as $index => $cardId) {

                $card = Card::find($cardId);


                if (! $card) {
                    continue; // Or log warning
                }

                $card->update([
                    'order' => $index + 1,
                    'column_id' => $column->id,
                ]);
            }
        }

        return [
            'success' => true,
            'updated_columns' => count($data['columns_with_card_ids']),
        ];
    }

}
