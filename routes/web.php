<?php

declare(strict_types=1);

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\LanguageStoreController;
use App\Http\Controllers\PlanController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Team\Models\Team;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('plans', [PlanController::class, 'index'])->name('plans.index')->middleware(['subscribed', 'auth']);

Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('language', LanguageStoreController::class)->name('language.store');

Route::post('/check-permission', function (Request $request) {
    $validated = $request->validate([
        'permission' => 'required|string',
        'resource' => 'nullable',
    ]);

    try {
        if ( is_null(@$validated['resource'])) {
            return response()->json([
                'can' => $request->user()->can($validated['permission']),
            ]);
        }

        $resources = collect($validated['resource'])->values()->toArray();

        $member = User::find($resources[1]);
        $team = Team::find($resources[0]);

        return response()->json([
            'can' => $request->user()->can(
                $validated['permission'],
                [$team, $member]
            ),
        ]);
    } catch (Exception $e) {
        return response()->json([
            'can' => false,
            'error' => $e->getMessage(),
        ], 400);
    }
})->middleware(['web', 'auth'])->name('check-permission');

require __DIR__.'/settings.php';
require __DIR__.'/billings.php';
require __DIR__.'/modules/kanban.php';
require __DIR__.'/auth.php';
