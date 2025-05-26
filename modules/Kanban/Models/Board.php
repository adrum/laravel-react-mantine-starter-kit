<?php

declare(strict_types=1);

namespace Module\Kanban\Models;

use App\Models\User;
use Database\Factories\BoardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function columns(): HasMany
    {
        return $this->hasMany(Column::class)->oldest();
    }

    public function addColumn(Column $column): void
    {
        $this->columns()->save($column);
    }

    protected static function newFactory()
    {

        return BoardFactory::new();

    }
}
