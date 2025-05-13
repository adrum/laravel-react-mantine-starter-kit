<?php

declare(strict_types=1);

namespace App\Http\Controllers\Billings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

final class BillingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('billings/overview');
    }

}
