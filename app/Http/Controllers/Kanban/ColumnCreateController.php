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
    public function create(): Response
    {
        return Inertia::render('modules/kanban/modals/create-column');
    }

    public function store(Request $request, CreateColumn $createColumn): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required'],
        ]);

        $createColumn->handle($data);
        session()->flash('success', 'Column created successfully');

        return redirect()->route('module.kanban.column.create')
            ->with('success', 'Column created successfully');
    }
}
