<?php

declare(strict_types=1);

use App\Http\Controllers\Kanban\BoardCreateController;
use App\Http\Controllers\Kanban\KanbanController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'boards', 'middleware' => 'auth'], function () {

    Route::get('/', [KanbanController::class, 'index'])->name('kanban');

    Route::get('/store', [BoardCreateController::class, 'store'])->name('module.kanban.board.store');
    Route::get('/create', [BoardCreateController::class, 'create'])->name('module.kanban.board.create');

});
