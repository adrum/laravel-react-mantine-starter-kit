<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Module\Kanban\Models\Card;

final class DeleteCard
{
    public function handle(array $data): Card
    {
        $id = $data['card_id'];
        $card = Card::find($id);

        $card->delete();
        return $card;
    }
}
