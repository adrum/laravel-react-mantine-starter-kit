<?php

// use Modules\Team\Http\Controllers\TeamController;
//

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Team\Http\Controllers\TeamController;
use Modules\Team\Http\Controllers\TeamMemberController;

Route::middleware(['web', 'auth'])->group(function () {

    Route::patch('/teams/{team}', [TeamController::class, 'update'])->name('module.team.update');
    Route::post('/teams/{team}/leave', [TeamController::class, 'leave'])->name('module.team.leave');
    Route::patch('/teams/{team}/set-current', [TeamController::class, 'setCurrent'])->name('module.team.set-current');
    Route::get('/teams/index', [TeamController::class, 'index'])->name('module.team.index');

    Route::delete('/team-member/{team}/{user}', [TeamMemberController::class, 'destroy'])->name('module.team-member.delete');

});


// Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
// Route::get('/teams/create', [TeamController::class, 'create'])->name('teams.create');
// Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
// Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
// Route::get('/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
// Route::put('/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
// Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
