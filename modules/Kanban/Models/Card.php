<?php

declare(strict_types=1);

namespace Module\Kanban\Models;

use Database\Factories\CardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Plank\Mediable\Mediable;
use Plank\Mediable\MediableInterface;

final class Card extends Model implements MediableInterface
{
    use HasFactory;
    use Mediable;

    protected $fillable = [
        'content',
        'column_id',
        'position',
    ];

    public function column(): BelongsTo
    {
        return $this->belongsTo(Column::class);
    }

    protected static function newFactory()
    {
        return CardFactory::new();
    }

    public function getMediaCardAttribute()
    {
        return $this->getMedia('card')->first()?->getUrl() ?? '/';
    }

    public function getMediaTypeAttribute()
    {
        return $this->getMedia('card')->first()?->aggregate_type ?? 'image';
    }
}
