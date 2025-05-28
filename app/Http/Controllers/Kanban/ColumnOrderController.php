<?php

declare(strict_types=1);

namespace App\Http\Controllers\Kanban;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Module\Kanban\Actions\CreateColumn;
use Module\Kanban\Actions\UpdateColumnOrder;

final class ColumnOrderController extends Controller
{

    public function update(Request $request, UpdateColumnOrder $updateColumnOrder): RedirectResponse
    {
        $data = $request->validate([
            'order' => 'required|array',
            'board_id' => 'required',
            'column_id' => 'required',
        ]);

        $updateColumnOrder->handle($data);

        return back();
    }
}
