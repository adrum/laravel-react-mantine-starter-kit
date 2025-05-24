<?php

declare(strict_types=1);

use App\Http\Controllers\Billings\BillingController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'subscription', 'middleware' => 'auth'], function () {
    Route::get('/billings/overview', [BillingController::class, 'index'])->name('billings.overview');
    Route::get('/portal', [SubscriptionController::class, 'portal'])->name('subscription.portal');

    Route::get('/cancel', [BillingController::class, 'cancel'])->name('subscription.cancel');
    Route::get('/resume', [BillingController::class, 'resume'])->name('subscription.resume');
    Route::get('/invoice', [BillingController::class, 'invoice'])->name('subscription.invoice');
});
