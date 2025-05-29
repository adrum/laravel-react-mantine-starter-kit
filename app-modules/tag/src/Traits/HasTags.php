<?php

namespace Modules\Tag\Traits;

use Modules\Tag\Models\Tag;
use Modules\Tag\Services\TaggingService;

trait HasTags
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function tagService(): TaggingService
    {
        return app(TaggingService::class);
    }

    public function syncTags(array $tags)
    {
        $this->tagService()->syncTags($this, $tags);
    }

    public function attachTag(string $tag)
    {
        $this->tagService()->attachTag($this, $tag);
    }

    public function detachTag(string $tag)
    {
        $this->tagService()->detachTag($this, $tag);
    }
}

