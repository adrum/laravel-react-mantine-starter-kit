<?php

declare(strict_types=1);

namespace App\Enums;

enum Language: string
{
    case EN = 'en';
    case PH = 'ph';

    public function label(): string
    {
        return match ($this) {
            self::EN => 'English',
            self::PH => 'Filipino',
        };
    }
}
