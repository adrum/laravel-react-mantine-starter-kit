<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateBoard;

final class BoardCreateController extends Controller
{
    public function create(): Response
    {
/* 'modules/kanban/modals/create-column' */
        return Inertia::render('modules/kanban/modals/create-column');
    }

    public function store(Request $request, CreateBoard $createBoard): Response
    {
        $createBoard->handle();
    }
}
