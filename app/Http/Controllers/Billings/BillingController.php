<?php

declare(strict_types=1);

namespace App\Http\Controllers\Billings;

use App\Decorator\Subscription;
use App\Http\Controllers\Controller;
use App\Http\Resources\InvoiceResource;
use Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

final class BillingController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $isSubscriptionCanceled = $user->subscribed() && $user->subscription('default')->canceled();

        $description = 'Upcoming Invoice At: ';
        $dateString = $user->upcomingInvoice()->date()->toDateString();

        if ($isSubscriptionCanceled) {
            $description = 'Ends At: ';
            $subscription = $user->subscription();
            /**
             * @var Carbon\Carbon $date
             */
            $date = $subscription->ends_at;
            $dateString = $date->toDateString();
        }

        return Inertia::render('billings/overview', [
            'plan' => $user->subscribed() ? (new Subscription($user->subscription()->asStripeSubscription()))->toArray() : null,
            'upcoming' => ['date' => $dateString],
            'is_canceled' => $isSubscriptionCanceled,
            'description' => $description,
            'total' => $user->upcomingInvoice()->total(),
            'invoices' => InvoiceResource::collection($user->invoices()),
        ])->with('success', 'Okay ka kokey');
    }

    public function resume(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $user->subscription()->resume();

        return to_route('billings.overview');
    }

    public function cancel(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $user->subscription()->cancel();

        return to_route('billings.overview');
    }

    public function invoice(Request $request): HttpFoundationResponse
    {

        /** @var \App\Models\User $user */
        $user = $request->user();

        return $user->downloadInvoice($request->invoice);
    }
}
