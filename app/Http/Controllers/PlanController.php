<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

final class PlanController extends Controller
{
    public function index(): Response
    {

        /** @var array{name: string, price_id: string} $monthly */
        $monthly = config('subscriptions.plans.monthly');

        /** @var array{name: string, price_id: string} $yearly */
        $yearly = config('subscriptions.plans.yearly');

        return Inertia::render('plans/index', [
            'monthly' => collect($monthly),
            'yearly' => collect($yearly),
        ]);
    }
}
