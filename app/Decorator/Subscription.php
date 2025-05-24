<?php

declare(strict_types=1);

namespace App\Decorator;

use Stripe\Plan;
use Stripe\Subscription as StripeSubscription;

final readonly class Subscription
{
    public function __construct(private StripeSubscription $subscription) {}

    /**
     * @return array{
     *     plan: string,
     *     title: string,
     *     currency: string
     * }
     */
    public function toArray(): array
    {
        return [
            'plan' => $this->plan(),
            'title' => $this->title(),
            'currency' => $this->currency(),
        ];
    }

    public function plan(): string
    {
        return 'Monthly';
    }

    /* public function title(): string */
    /* { */
    /*     // @var Plan $plan */
    /*     $plan = $this->subscription->plan; */
    /*     dd($plan); */
    /*     return $this->planFromPriceId($this->subscription->plan->id)['name']; */
    /* } */

    public function title(): string
    {
        $item = $this->subscription->items->data[0] ?? null;

        if (! $item) {
            return 'Unknown Plan';
        }

        $priceId = $item->price->id;

        return $this->planFromPriceId($priceId)['name'] ?? 'Unknown Plan';
    }

    public function currency(): string
    {
        return mb_strtoupper($this->subscription->currency);
    }

    /**
     * @return array{name: string, price_id: string}|null
     */
    private function planFromPriceId(string $priceId): ?array
    {
        /** @var array{name: string, price_id: string}|null $result */
        $result = once(function () use ($priceId): ?array {
            /** @var array<array{name: string, price_id: string}> $plans */
            $plans = config('subscriptions.plans');

            return collect($plans)
                ->first(fn (array $plan): bool => $plan['price_id'] === $priceId);
        });

        return $result;
    }
}
