<?php

declare(strict_types=1);

use App\Http\Controllers\Billings\BillingController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'boards', 'middleware' => 'auth'], function () {

    Route::get('/', [KanbanController::class, 'index']);


});
