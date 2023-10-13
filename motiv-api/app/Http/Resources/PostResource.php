<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            "title" => $this->title,
            "article_content" => $this->article_content,
            "image" => $this->image,
            "writer" => $this->whenLoaded('user'),
            "comments" => $this->whenLoaded('comments', function () {
                return $this->comments->map(function ($comment) {
                    return [
                        'username' => $comment->commentator->username,
                        'comment_content' => $comment->comment,
                        'created_at' => date_format($this->created_at, "Y-m-d")
                    ];
                });
            }),
            "comments_total" => $this->whenLoaded('comments', function () {
                return $this->comments->count();
            }),
            "created_at" => date_format($this->created_at, "Y-m-d")
        ];
    }
}
