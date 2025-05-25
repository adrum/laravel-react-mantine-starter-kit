<?php

declare(strict_types=1);

namespace Modules\kanban\Models;

use Database\Factories\CardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Card extends Model
{
    use HasFactory;

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
}
