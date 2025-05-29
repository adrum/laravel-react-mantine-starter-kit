<?php

namespace Modules\Media\Contracts;

use Illuminate\Http\UploadedFile;
use Plank\Mediable\Media;

interface MediaRepositoryInterface
{
    public function upload(UploadedFile $file, string $disk = 'public', ?string $directory = null): Media;
}

