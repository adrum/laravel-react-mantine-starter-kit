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

final class CardFilesController extends Controller
{
    public function create(Request $request, int|string $column_id): Response
    {
        return Inertia::render('modules/kanban/modals/create-files', [
            'column_id' => $column_id,
            'board_id' => $request->only('board_id')['board_id'],
        ]);
    }

    public function store(Request $request, CreateCardFiles $createCardFiles): RedirectResponse
    {
        $data = $request->validate([
            'files' => ['required|array'],
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required',
        ]);

        $createCardFiles->handle($data);

        return back()->with('success', 'Card created successfully');
    }
}
