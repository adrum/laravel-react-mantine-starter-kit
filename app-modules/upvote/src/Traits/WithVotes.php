<?php

namespace Modules\Upvote\Traits;

use Modules\Upvote\Models\Vote;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait WithVotes
{
    public function votes(): MorphMany
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    public function upvotes()
    {
        return $this->votes()->where('type', 'up');
    }

    public function downvotes()
    {
        return $this->votes()->where('type', 'down');
    }

    public function voteScore(): int
    {
        return $this->upvotes()->count() - $this->downvotes()->count();
    }
}

