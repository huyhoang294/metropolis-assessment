<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'has_vehicle' => $this->has_vehicle,
            'purpose_of_visiting' => $this->purpose_of_visiting,
            'check_out' => $this->check_out,
            'check_in' => $this->check_in,
            'created_at' => $this->created_at->format('d-m-Y H:i:s'),
        ];
    }
}
