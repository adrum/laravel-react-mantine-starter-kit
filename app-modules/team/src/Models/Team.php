<?php

declare(strict_types=1);

namespace Modules\Team\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class, 'team_user', 'team_id', 'user_id')
            ->withTimestamps();
    }
}
