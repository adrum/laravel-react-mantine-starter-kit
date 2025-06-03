<?php

namespace Modules\Tag\Contracts;

use App\Models\User;
use Modules\Tag\Models\Tag;

interface TeamRepositoryInterface
{
    public function getUserTeams(User $user);
}

