<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;

final class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        abort_unless(
            $plan = collect(config('subscriptions.plans'))->get($request->plan),
            404
        );

        return $request->user()->newSubscription('default', $plan['price_id'])
            ->checkout([
                'success_url' => route('home'),
                'cancel_url' => route('home'),
            ]);

    }
}
