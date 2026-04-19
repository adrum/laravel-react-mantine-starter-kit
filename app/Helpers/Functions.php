<?php

use App\Enums\FlashToastType;
use Inertia\Inertia;

if (! function_exists('toast')) {
    function toast(string $message, FlashToastType $type = FlashToastType::SUCCESS): void
    {
        if ($message) {
            Inertia::flash('toast', ['type' => $type, 'message' => $message]);
        }
    }
}

if (! function_exists('toastSuccess')) {
    function toastSuccess(string $message): void
    {
        toast($message, FlashToastType::SUCCESS);
    }
}

if (! function_exists('toastInfo')) {
    function toastInfo(string $message): void
    {
        toast($message, FlashToastType::INFO);
    }
}

if (! function_exists('toastWarning')) {
    function toastWarning(string $message): void
    {
        toast($message, FlashToastType::WARNING);
    }
}

if (! function_exists('toastError')) {
    function toastError(string $message): void
    {
        toast($message, FlashToastType::ERROR);
    }
}
