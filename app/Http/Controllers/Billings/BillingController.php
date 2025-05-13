<?php

declare(strict_types=1);

namespace App\Http\Controllers\Billings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

final class BillingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('billings/overview');
    }
}
