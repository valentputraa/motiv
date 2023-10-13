<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "id_user" => $this->id_user,
            "commentator" => $this->whenLoaded('commentator'),
            "created_at" => date_format($this->created_at, 'Y-m-d'),
            "updated_at" => date_format($this->updated_at, 'Y-m-d'),
        ];
    }
}
