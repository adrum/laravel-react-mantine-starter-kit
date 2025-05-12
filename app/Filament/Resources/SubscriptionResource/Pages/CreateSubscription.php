<?php

declare(strict_types=1);

namespace App\Filament\Resources\SubscriptionResource\Pages;

use App\Filament\Resources\SubscriptionResource;
use Filament\Resources\Pages\CreateRecord;

final class CreateSubscription extends CreateRecord
{
    protected static string $resource = SubscriptionResource::class;
}
