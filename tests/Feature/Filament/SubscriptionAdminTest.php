<?php

declare(strict_types=1);

use App\Filament\Resources\SubscriptionResource\Pages\ListSubscriptions;

use function Pest\Livewire\livewire;

it('can render user page', function () {

    adminAuth();

    livewire(ListSubscriptions::class)->assertSuccessful();
});
