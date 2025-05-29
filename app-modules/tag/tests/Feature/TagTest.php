<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Modules\Tag\Models\Tag;
use Modules\Tag\Traits\HasTags;

beforeEach(function () {
    // Dynamically create a fake table for our test model
    Schema::create('mock_models', function ($table) {
        $table->id();
        $table->timestamps();
    });
});

// Define a mock taggable model
class MockModel extends Model
{
    use HasTags;

    protected $table = 'mock_models';
    protected $guarded = [];
    public $timestamps = true;
}

it('creates a tag with the factory', function () {
    $tag = Tag::factory()->create(['name' => 'Testing']);
    expect($tag->name)->toBe('Testing');
});

it('can attach a tag to a mock model', function () {
    $model = MockModel::create(); // Using dynamic table
    $model->attachTag('Laravel');

    $tagNames = $model->tags->pluck('name')->toArray();

    expect($tagNames)->toContain('Laravel');
    expect($model->tags)->toHaveCount(1);
});

it('can sync multiple tags on a mock model', function () {
    $model = MockModel::create();
    $model->syncTags(['Pest', 'Octane', 'Testing']);

    $tagNames = $model->tags->pluck('name')->toArray();

    expect($tagNames)->toContain('Pest');
    expect($tagNames)->toContain('Octane');
    expect($tagNames)->toContain('Testing');
    expect($model->tags)->toHaveCount(3);
});

