<?php

namespace Modules\Upvote\Contracts;

use Illuminate\Database\Eloquent\Model;
use Modules\Upvote\Models\Vote;

interface VoteRepositoryInterface
{
    public function toggle(Model $model, int $userId, string $type): Vote|null;
    public function getVote(Model $model, int $userId): Vote|null;
}

