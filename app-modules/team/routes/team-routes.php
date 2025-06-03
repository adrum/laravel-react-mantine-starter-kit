<?php

// use Modules\Team\Http\Controllers\TeamController;
//

use Illuminate\Support\Facades\Route;
use Modules\Team\Http\Controllers\TeamController;

Route::middleware('web')->group(function () {

    Route::patch('/teams/{team}', [TeamController::class, 'update'])->name('module.team.update');
    Route::patch('/teams/{team}/set-current', [TeamController::class, 'setCurrent'])->name('module.team.set-current');
    Route::get('/teams/index', [TeamController::class, 'index'])->name('module.team.index');

});




// Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
// Route::get('/teams/create', [TeamController::class, 'create'])->name('teams.create');
// Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
// Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
// Route::get('/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
// Route::put('/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
// Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
