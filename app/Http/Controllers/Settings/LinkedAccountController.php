<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use SocialiteUi\Events\SocialAccountDeleted;
use SocialiteUi\Providers;

class LinkedAccountController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('settings/linked-accounts', [
            'status' => request()->session()->get('status'),
        ]);
    }

    public function destroy(Request $request, SocialAccount $account): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        event(new SocialAccountDeleted($account));

        $account->delete();

        return redirect()->route('linked-accounts')->with(
            'status', __('Your :provider account has been unlinked.', ['provider' => Providers::name($account->provider)])
        );
    }
}

