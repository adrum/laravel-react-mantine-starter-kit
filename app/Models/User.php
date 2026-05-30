<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
/* @chisel-passkeys */
use Illuminate\Database\Eloquent\Attributes\Appends;
/* @end-chisel-passkeys */
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
/* @chisel-passkeys */
#[Appends(['has_password'])]
/* @end-chisel-passkeys */
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            /* @chisel-2fa */
            'two_factor_confirmed_at' => 'datetime',
            /* @end-chisel-2fa */
        ];
    }

    /* @chisel-passkeys */
    /**
     * Whether the account has a password set. Passwordless
     * (passkey-only) accounts return false, which the
     * confirm-password screen uses to hide the password form
     * and force the passkey confirmation path instead.
     */
    protected function getHasPasswordAttribute(): bool
    {
        return ! empty($this->password);
    }
    /* @end-chisel-passkeys */
}
