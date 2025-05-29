<?php

namespace Modules\Tag\Repositories;

use Modules\Tag\Models\Tag;
use Illuminate\Support\Str;
use Modules\Tag\Contracts\TagRepositoryInterface;

class TagRepository implements TagRepositoryInterface
{
    public function findOrCreateByName(string $name): Tag
    {
        return Tag::firstOrCreate(
            ['slug' => Str::slug($name)],
            ['name' => $name]
        );
    }

    public function findBySlug(string $slug): ?Tag
    {
        return Tag::where('slug', $slug)->first();
    }
}

