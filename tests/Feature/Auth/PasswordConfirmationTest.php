<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase;

    public function test_confirm_password_screen_can_be_rendered()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('password.confirm'));

        $response->assertOk();

        $response->assertInertia(fn (Assert $page) => $page
            ->component('auth/confirm-password'),
        );
    }

    public function test_password_confirmation_requires_authentication()
    {
        $response = $this->get(route('password.confirm'));

        $response->assertRedirect(route('login'));
    }

    /* @chisel-passkeys */
    public function test_confirm_password_screen_exposes_has_passkeys_prop()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('password.confirm'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('auth/confirm-password')
                ->where('hasPasskeys', false),
            );
    }

    public function test_user_exposes_has_password_flag()
    {
        $withPassword = User::factory()->create();
        $passwordless = User::factory()->create(['password' => null]);

        $this->assertTrue($withPassword->toArray()['has_password']);
        $this->assertFalse($passwordless->toArray()['has_password']);
    }
    /* @end-chisel-passkeys */

    public function test_password_confirmation_succeeds_with_correct_password()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('password.confirm'), ['password' => 'password'])
            ->assertSessionHasNoErrors();
    }

    public function test_passwordless_account_cannot_confirm_via_password_form()
    {
        // A passkey-only account has no password to confirm against —
        // the password form must be rejected so the UI routes them to
        // the passkey confirmation flow instead.
        $user = User::factory()->create(['password' => null]);

        $this->actingAs($user)
            ->post(route('password.confirm'), ['password' => 'anything'])
            ->assertSessionHasErrors('password');
    }
}
