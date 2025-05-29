<?php

use Modules\Media\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Modules\Media\Contracts\MediaRepositoryInterface;
use Plank\Mediable\Media;

it('uploads and attaches media', function () {
    $file = UploadedFile::fake()->image('card.jpg');

    // Fake model with attachMedia method
    $model = new class extends \Illuminate\Database\Eloquent\Model {
        use \Plank\Mediable\Mediable;
        protected $table = 'mock_models';
        public function attachMedia($media, $tag) {
            // Just pretend it's attached
        }
    };

    $media = Mockery::mock(Media::class);
    $media->shouldReceive('getKey')->andReturn(123);

    $mockRepo = Mockery::mock(MediaRepositoryInterface::class);
    $mockRepo->shouldReceive('upload')
        ->once()
        ->with($file, 'public', null)
        ->andReturn($media);

    $service = new MediaService($mockRepo);
    $result = $service->uploadAndAttach($model, $file);

    expect($result)->toBe($media);
});

