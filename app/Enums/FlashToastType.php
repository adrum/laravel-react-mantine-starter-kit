<?php

namespace App\Enums;

/** @typescript */
enum FlashToastType: string
{
    case SUCCESS = 'success';
    case INFO = 'info';
    case WARNING = 'warning';
    case ERROR = 'error';
}
