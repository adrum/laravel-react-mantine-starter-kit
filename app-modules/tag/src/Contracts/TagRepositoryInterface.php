<?php

namespace Modules\Tag\Contracts;

use Modules\Tag\Models\Tag;

interface TagRepositoryInterface
{
    public function findOrCreateByName(string $name): Tag;

    public function findBySlug(string $slug): ?Tag;
}

