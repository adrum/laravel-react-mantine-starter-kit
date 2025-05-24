<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Laravel\Cashier\Invoice;

final class InvoiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    // @param-colsure-this Invoice $callback
    public function toArray(Request $request): array
    {

        /**
         * @var Invoice $this
         */

        return [
            'id' => $this->id,
            'date' => $this->date()->toDateString(),
            'total' => $this->total(),
        ];
    }
}
