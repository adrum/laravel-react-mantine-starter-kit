<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        return Inertia::render('plans/index', [
            'monthly' => collect(config('subscriptions.plans'))->get('monthly'),
            'yearly' => collect(config('subscriptions.plans'))->get('yearly'),

        ]);
    }
}
