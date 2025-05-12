<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Laravel\Cashier\Subscription as CashierSubscription;

final class Subscription extends CashierSubscription
{
    use HasTimestamps;
}
