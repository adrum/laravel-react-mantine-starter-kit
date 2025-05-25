<?php

declare(strict_types=1);

namespace Modules\kanban\Models;

use Database\Factories\ColumnFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Column extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'board_id',
    ];

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class)->orderBy('position');
    }

    public function addCard(Card $card): void
    {
        $this->cards()->save($card);
    }

    protected static function newFactory()
    {
        return ColumnFactory::new();
    }
}
