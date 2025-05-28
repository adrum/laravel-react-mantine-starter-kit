<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateCard;
use Module\Kanban\Actions\CreateColumn;

final class CardFilesController extends Controller
{
    public function create(Request $request, int|string $column_id): Response
    {
        return Inertia::render('modules/kanban/modals/create-files', [
            'column_id' => $column_id,
            'board_id' => $request->only('board_id')['board_id'],
        ]);
    }

    public function store(Request $request, CreateCard $createCard): RedirectResponse
    {
        $data = $request->validate([
            'content' => ['required'],
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required',
        ]);

        $createCard->handle($data);

        return back()->with('success', 'Card created successfully');
    }
}
