<?php

declare(strict_types=1);

use App\Http\Controllers\Billings\BillingController;
use App\Http\Controllers\Settings\LinkedAccountController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {


    Route::get('/billings/overview', [BillingController::class, 'index'])->name('billings.overview');


});
