<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Models\Column;

final class KanbanController extends Controller
{
    public function index(): Response
    {

        $columns = Column::query()->get()->mapWithKeys(function (Column $column) {
            return [$column->name => [
                'totnak squad',
            ]];
        });

        dd($columns);

        return Inertia::render('modules/kanban/index', [
            'initialData' => (object) [
                'todo' => [
                    [
                        'id' => '1', 'title' => 'Test title 56',
                    ],
                    [
                        'id' => '2', 'title' => 'Test title 56',
                    ],
                    [
                        'id' => '3', 'title' => 'Test title 56',
                    ],
                ],

                'doing' => [
                    [
                        'id' => '4', 'title' => 'Test title 1',
                    ],

                    [
                        'id' => '5', 'title' => 'Test title 1',
                    ],
                    [
                        'id' => '8', 'title' => 'Test title 1',
                    ],
                    [
                        'id' => '18', 'title' => 'Test title 1',
                    ],
                    [
                        'id' => '28', 'title' => 'Test title 1',
                    ],
                    [
                        'id' => '38', 'title' => 'Test title 1',
                    ],
                ],
            ],

            'initialColumnNames' => [
                'todo' => 'To Do',
                'doing' => 'Doing',
            ],

        ]);
    }
}
