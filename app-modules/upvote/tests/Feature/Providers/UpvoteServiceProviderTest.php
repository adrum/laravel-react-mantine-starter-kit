<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Upvote\Models\Vote;
use Modules\Upvote\Repositories\VoteRepository;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Modules\Upvote\Traits\WithVotes;

beforeEach(function () {
    // Create votables table just for testing
    Schema::create('votables', function ($table) {
        $table->id();
    });

    $this->repo = new VoteRepository();

    $this->votable = new class extends \Illuminate\Database\Eloquent\Model {
        use WithVotes;

        protected $table = 'votables';
        public $timestamps = false;
        protected $guarded = [];
    };

    $this->votable->save();

    $this->userId = \App\Models\User::factory()->create()->id;
});


it('toggles upvote when none exists', function () {
    $vote = $this->repo->toggle($this->votable, $this->userId, 'up');

    expect($vote)->not->toBeNull()
        ->and($vote->type)->toBe('up')
        ->and($this->votable->votes()->count())->toBe(1);
});

it('removes upvote on second toggle', function () {
    $this->repo->toggle($this->votable, $this->userId, 'up');
    $removed = $this->repo->toggle($this->votable, $this->userId, 'up');

    expect($removed)->toBeNull()
        ->and($this->votable->votes()->count())->toBe(0);
});

it('switches from upvote to downvote', function () {
    $this->repo->toggle($this->votable, $this->userId, 'up');
    $vote = $this->repo->toggle($this->votable, $this->userId, 'down');

    expect($vote)->not->toBeNull()
        ->and($vote->type)->toBe('down')
        ->and($this->votable->votes()->count())->toBe(1);
});

it('retrieves vote by user', function () {
    $this->repo->toggle($this->votable, $this->userId, 'up');
    $vote = $this->repo->getVote($this->votable, $this->userId);

    expect($vote)->not->toBeNull()
        ->and($vote->type)->toBe('up');
});

it('allows multiple users to vote', function () {
    $user2 = User::factory()->create();

    $this->repo->toggle($this->votable, $this->userId, 'up');
    $this->repo->toggle($this->votable, $user2->id, 'down');

    expect($this->votable->votes()->count())->toBe(2);
});


