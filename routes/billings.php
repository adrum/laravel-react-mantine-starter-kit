<?php

declare(strict_types=1);

use App\Http\Controllers\Billings\BillingController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::get('/billings/overview', [BillingController::class, 'index'])->name('billings.overview');

});
