<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'id_post' => 'required|exists:posts,id',
            'comment' => 'required',
        ]);

        $request['id_user'] = Auth::user()->id;
        $comment = Comment::create($request->all());

        return response()->json([
            "message" => "Comment sent successfully",
            "data" => new CommentResource($comment->loadMissing(['commentator:id,username']))
        ]);

    }

    public function update(Request $request, $id){
        $request->validate([
             "comment" => "required"
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($request->only("comment"));

        return response()->json([
            "message" => "Comment updated successfully",
            "data" => new CommentResource($comment->loadMissing(['commentator:id,username']))
        ]);

    }

    public function destroy($id){
        Comment::destroy($id);
        return response()->json(["message" => "Comments successfully deleted"]);
    }
}
