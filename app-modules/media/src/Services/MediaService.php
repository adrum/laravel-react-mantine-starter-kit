<?php

namespace Modules\Media\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Modules\Media\Contracts\MediaRepositoryInterface;
use Plank\Mediable\Media;

class MediaService
{
    public function __construct(
        private MediaRepositoryInterface $mediaRepository
    ) {}

    public function uploadAndAttach(Model $model, UploadedFile $file, string $tag = 'default', string $disk = 'public', ?string $directory = null): Media
    {
        $media = $this->mediaRepository->upload($file, $disk, $directory);

        if (method_exists($model, 'attachMedia')) {
            $model->attachMedia($media, $tag);
        }

        return $media;
    }
}

