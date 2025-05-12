<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use SocialiteUi\Enums\Provider;
use SocialiteUi\Events\SocialAccountCreated;
use SocialiteUi\Events\SocialAccountDeleted;
use SocialiteUi\Events\SocialAccountUpdated;
use SocialiteUi\SocialAccount as Base;
use SocialiteUi\SocialiteUi;

final class SocialAccount extends Base
{
    /** @use HasFactory<\Database\Factories\SocialAccountFactory> */
    use HasFactory;

    use HasTimestamps;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'provider',
        'provider_id',
        'name',
        'nickname',
        'email',
        'avatar',
        'token',
        'secret',
        'refresh_token',
        'expires_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var list<string>
     */
    protected $hidden = [
        'token',
        'access_token',
        'refresh_token',
    ];

    /**
     * The event map for the model.
     *
     * @var array<string, class-string>
     */
    protected $dispatchesEvents = [
        'created' => SocialAccountCreated::class,
        'updated' => SocialAccountUpdated::class,
        'deleted' => SocialAccountDeleted::class,
    ];

    /**
     * Get user of the social account.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        /** @var BelongsTo<User, $this> */
        return $this->belongsTo(SocialiteUi::userModel(), 'user_id', (SocialiteUi::newUserModel())->getAuthIdentifierName());
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'expires_at' => 'datetime',
            'provider' => Provider::class,
        ];
    }
}
