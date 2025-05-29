<?php

namespace Modules\Upvote\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['user_id', 'type'];

    public function votable()
    {
        return $this->morphTo();
    }
}

