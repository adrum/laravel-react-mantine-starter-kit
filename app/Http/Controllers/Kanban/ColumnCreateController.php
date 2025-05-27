<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateColumn;

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
}
