<?php

declare(strict_types=1);

use App\Enums\Language;

it('returns the correct language', function () {
    expect(Language::from('en')->label())->toBe('English');
});
