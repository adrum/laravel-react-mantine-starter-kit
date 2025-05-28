<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateColumn;
use Module\Kanban\Actions\DeleteColumn;
use Module\Kanban\Actions\UpdateColumnTitle;

final class ColumnCreateController extends Controller
{

    public function create(int $board_id): Response
    {
        return Inertia::render('modules/kanban/modals/create-column', [
            'board_id' => $board_id,
        ]);
    }

    public function store(Request $request, CreateColumn $createColumn): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required'],
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
        ]);

        $createColumn->handle($data);

        return back()->with('success', 'Column created successfully');
    }

    public function destroy(Request $request, DeleteColumn $deleteColumn): RedirectResponse
    {
        $deleteColumn->handle($request->validate([
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required|string',
        ]));

        return back()->with('success', 'Column deleted successfully');
    }

    public function confirmDelete(Request $request): Response
    {
        $data = $request->validate([
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required|string',
        ]);

        return Inertia::render('modules/kanban/modals/confirm-delete-column', [
            'board_id' => $data['board_id'],
            'column_id' => $data['column_id'],
        ]);
    }

    public function updateTitle(Request $request, UpdateColumnTitle $updateColumnTitle): RedirectResponse
    {
        $data = $request->validate([
            'board_id' => 'required|exists:Module\Kanban\Models\Board,id',
            'column_id' => 'required|string',
            'title' => ['required'],
        ]);

        $updateColumnTitle->handle($data);

        return back()->with('success', 'Column title updated successfully');
    }

}
