<?php

declare(strict_types=1);

namespace Module\Kanban\Actions;

use Module\Kanban\Models\Board;
use Plank\Mediable\Facades\MediaUploader;

final class CreateCardFiles
{
    public function handle(array $data): void
    {
        $column = Board::find($data['board_id'])->columns()->where('title', $data['column_id'])->first();

        foreach ($data['files'] as $file) {
            $card = $column->cards()->create([]);
            $media = MediaUploader::fromSource($file)
                ->toDestination('public', 'cards/')
                ->upload();
            $card->attachMedia($media, ['card']);
        }
    }
}
