<?php

namespace Modules\Tag\Services;

use Illuminate\Database\Eloquent\Model;
use Modules\Tag\Contracts\TagRepositoryInterface;

class TaggingService
{
    public function __construct(
        protected TagRepositoryInterface $repo
    ) {}

    public function syncTags(Model $model, array $tagNames): void
    {
        $tagIds = collect($tagNames)->map(fn($name) =>
            $this->repo->findOrCreateByName($name)->id
        );

        $model->tags()->sync($tagIds);
    }

    public function attachTag(Model $model, string $tagName): void
    {
        $tag = $this->repo->findOrCreateByName($tagName);
        $model->tags()->syncWithoutDetaching([$tag->id]);
    }

    public function detachTag(Model $model, string $tagName): void
    {
        $tag = $this->repo->findBySlug(\Str::slug($tagName));
        if ($tag) $model->tags()->detach($tag->id);
    }
}

