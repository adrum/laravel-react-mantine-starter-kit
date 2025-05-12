<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Checkout;

final class CheckoutController extends Controller
{
    public function index(Request $request): Checkout
    {
        /** @var array{monthly: array{name: string, price_id: string}, yearly: array{name: string, price_id: string}} $plans */
        $plans = config('subscriptions.plans');

        $plan = collect($plans)->get($request->plan);
        abort_unless($plan !== null, 404);

        return $request->user()->newSubscription('default', $plan['price_id'])
            ->checkout([
                'success_url' => route('home'),
                'cancel_url' => route('home'),
            ]);

    }
}
