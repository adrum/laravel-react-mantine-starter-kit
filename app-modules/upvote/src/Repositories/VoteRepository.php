<?php

namespace Modules\Upvote\Repositories;

use Modules\Upvote\Models\Vote;
use Modules\Upvote\Contracts\VoteRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class VoteRepository implements VoteRepositoryInterface
{
    public function toggle(Model $model, int $userId, string $type): ?Vote
    {
        $existing = $this->getVote($model, $userId);

        if ($existing) {
            if ($existing->type === $type) {
                $existing->delete();
                return null;
            }

            $existing->update(['type' => $type]);
            return $existing;
        }

        return $model->votes()->create([
            'user_id' => $userId,
            'type' => $type,
        ]);
    }

    public function getVote(Model $model, int $userId): ?Vote
    {
        return $model->votes()->where('user_id', $userId)->first();
    }
}

