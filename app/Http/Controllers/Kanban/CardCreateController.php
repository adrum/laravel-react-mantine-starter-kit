<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateCard;
use Module\Kanban\Actions\CreateCardFiles;
use Module\Kanban\Actions\CreateColumn;
use Module\Kanban\Actions\DeleteCard;

final class CardCreateController extends Controller
{
    public function create(Request $request, int|string $column_id): Response
    {
        return Inertia::render('modules/kanban/modals/create-card', [
            'column_id' => $column_id,
            'board_id' => $request->only('board_id')['board_id'],
        ]);
    }

    public function storeFiles(Request $request, CreateCardFiles $createCardFiles): RedirectResponse
    {
        $data = $request->validate([
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required',
            'files' => 'array'
        ]);


        $createCardFiles->handle($data, $data['files']);

        return back()->with('success', 'Card created successfully');
    }

    public function store(Request $request, CreateCard $createCard): RedirectResponse
    {
        $data = $request->validate([
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required',
            'content' => 'required'
        ]);

        $createCard->handle($data);

        return back()->with('success', 'Card created successfully');
    }




    public function destroy(Request $request, DeleteCard $deleteCard): RedirectResponse
    {
        $board  = $deleteCard->handle($request->validate([
            'card_id' => 'required|string',
        ]));

        return back()
            ->with('success', 'Card deleted successfully')
            ->with('board_id', $board->id);
    }

    public function confirmDelete(Request $request): Response
    {
        $data = $request->validate([
            'id' => 'required|exists:Module\Kanban\Models\Card,id',
        ]);

        return Inertia::render('modules/kanban/modals/confirm-delete-card', [
            'card_id' => $data['id'],
        ]);
    }


}
