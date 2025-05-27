<?php

declare(strict_types=1);

use App\Http\Controllers\Kanban\BoardCreateController;
use App\Http\Controllers\Kanban\ColumnCreateController;
use App\Http\Controllers\Kanban\KanbanController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'boards', 'middleware' => 'auth'], function () {
    Route::get('/', [BoardCreateController::class, 'index'])->name('module.kanban.board.index');
    Route::post('/store', [BoardCreateController::class, 'store'])->name('module.kanban.board.store');
    Route::post('/update', [BoardCreateController::class, 'update'])->name('module.kanban.board.update');
    Route::get('/create', [BoardCreateController::class, 'create'])->name('module.kanban.board.create');
    Route::get('/show/{id}', [BoardCreateController::class, 'show'])->name('module.kanban.board.show');
    Route::get('/edit/{id}', [BoardCreateController::class, 'edit'])->name('module.kanban.board.edit');
    Route::delete('/delete', [BoardCreateController::class, 'destroy'])->name('module.kanban.board.delete');
});
