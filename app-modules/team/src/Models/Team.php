<?php

declare(strict_types=1);

namespace Modules\Team\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    public function members()
    {
       return $this->belongsToMany(User::class);
    }
}
