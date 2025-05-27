<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateBoard;
use Module\Kanban\Actions\DeleteBoard;
use Module\Kanban\DTOs\BoardData;
use Module\Kanban\Models\Board;

final class BoardCreateController extends Controller
{
    public function index()
    {
        $boards = Board::query();

        if (request('search', null)) {
            $boards = $boards->where('title', 'like', '%'.request('search').'%');
        }

        return Inertia::render('modules/kanban/board/index', [
            'boards' => BoardData::collect($boards->orderByDesc('id')->paginate(request('per_page', 5))),
            'filters' => [
                'search' => request('search', ''),
                'per_page' => request('per_page', ''),
                'search' => request('search', ''),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('modules/kanban/modals/create-board');
    }

    public function edit(int $id): Response
    {
        return Inertia::render('modules/kanban/modals/create-board', [
            'board' => BoardData::from(Board::find($id)),
        ]);
    }

    public function store(Request $request, CreateBoard $createBoard): RedirectResponse
    {
        $data = $request->validate(['title' => 'required']) + ['user_id' => $request->user()->id];
        $createBoard->handle($data);

        return back()->with('success', 'Board created successfully');

    }

    public function update(Request $request, CreateBoard $updateBoard): RedirectResponse
    {
        $data = $request->validate(['title' => 'required', 'id' => 'required|exists:Module\Kanban\Models\Board,id']) + ['user_id' => $request->user()->id];
        $updateBoard->handle($data);

        return back()->with('success', 'Board updated successfully');
    }

    public function destroy(Request $request, DeleteBoard $deleteBoard): RedirectResponse
    {
        $data = $request->validate([
            'id' => 'required|exists:Module\Kanban\Models\Board,id',
        ]);
        $deleteBoard->handle($data['id']);

        return back()->with('success', 'Board deleted successfully');
    }

    public function show(int|string $id): Response
    {
        $board = Board::with('columns.cards')->findOrFail($id);

        $initialData = $board->columns->mapWithKeys(function ($column) {
            return [
                $column->title => $column->cards->map(function ($card) {
                    return [
                        'id' => $card->id,
                        'title' => $card->content,
                    ];
                })->toArray(),
            ];
        });

        $initialColumnNames = $board->columns->mapWithKeys(function ($column) {
            return [
                $column->title => $column->title,
            ];
        });

        return Inertia::render('modules/kanban/show', [
            'board' => BoardData::from($board),
            'initialData' => $initialData,
            'initialColumnNames' => $initialColumnNames,
        ]);
    }
}
