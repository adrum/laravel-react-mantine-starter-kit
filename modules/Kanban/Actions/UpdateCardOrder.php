<?php
declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Module\Kanban\Models\Card; // Assuming you have a Card model
use Module\Kanban\Models\Column;

final class UpdateCardOrder
{
    public function handle(array $data)
    {
        $board = Board::find($data['board_id']);
        $column = $board->columns()->where('title', $data['column_id'])->first();

        foreach ($data['order'] as $index => $card) {
            $column->cards()->where('id', $card['id'])->update(['order' => $index + 1]);
        }

        return [
            'success' => true,
            'updated_cards' => count($data['order'])
        ];
    }

    /* public function handleBulk(array $data) */
    /* { */
    /*     if (empty($data['order'])) { */
    /*         return ['success' => false, 'message' => 'No order data provided']; */
    /*     } */

    /*     $cardIds = array_map('intval', $data['order']); // Sanitize IDs */
    /*     $cases = []; */
    /*     $params = []; */

    /*     foreach ($data['order'] as $index => $cardId) { */
    /*         $cases[] = "WHEN id = ? THEN ?"; */
    /*         $params[] = $cardId; */
    /*         $params[] = $index + 1; // Order starts from 1 */
    /*     } */

    /*     $cardIdsPlaceholders = str_repeat('?,', count($cardIds) - 1) . '?'; */
    /*     $sql = "UPDATE cards SET `order` = CASE " . implode(' ', $cases) . " END WHERE id IN ($cardIdsPlaceholders)"; */

    /*     $allParams = array_merge($params, $cardIds); */

    /*     \DB::statement($sql, $allParams); */

    /*     return [ */
    /*         'success' => true, */
    /*         'updated_cards' => count($cardIds) */
    /*     ]; */
    /* } */
}
