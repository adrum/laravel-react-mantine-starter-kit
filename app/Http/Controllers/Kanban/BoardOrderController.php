<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateColumn;
use Module\Kanban\Actions\UpdateBoardOrder;
use Module\Kanban\Actions\UpdateCardOrder;
use Module\Kanban\Actions\UpdateColumnOrder;

final class BoardOrderController extends Controller
{

    public function update(Request $request, UpdateBoardOrder $updateBoardOrder): RedirectResponse
    {
        $data = $request->validate([
            'columns_with_card_ids' => 'required|array',
            'board_id' => 'required',
        ]);

        $updateBoardOrder->handle($data);

        return back();
    }
}
