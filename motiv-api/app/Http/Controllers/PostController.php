<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\File;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();
        $data = [
            'status' => true,
            'message' => 'All customers fetched successfully',
        ];
        return PostResource::collection($posts->loadMissing(['user:id,username', 'comments:id,id_post,id_user,comment']));
    }

    public function show($id){
        $post = Post::with('user:id,username')->findOrFail($id);
        return new PostResource($post->loadMissing(['user:id,username', 'comments:id,id_post,id_user,comment']));
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|max:255',
            'article_content' => 'required',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($request->file) {
            $imageName = Str::random(12) . '.' . $request->file->extension();
            $request['image'] = $imageName;
            Storage::putFileAs('image', $request->file, $imageName);
            
        }
        
        
        $request['user_id'] = Auth::user()->id;
        $post = Post::create($request->all());

        return response()->json([
            'message' => 'Data successfully posted',
            'data' => new PostResource($post->loadMissing(['user:id,username']))
        ]);
       
        
    }

    public function update(Request $request, $id){
        $request->validate([
            'title' => 'required|max:255',
            'article_content' => 'required',
            'file' => 'image|mimes:jpeg,png,jpg,gif'
        ]);
        
        $post = Post::findOrFail($id);
        if ($request->file) {
            $imageName = Str::random(12) . '.' . $request->file->extension();
            $request['image'] = $imageName;
            Storage::putFileAs('image', $request->file, $imageName);
            $oldImage = $post->image;
            Storage::delete('image/' . $oldImage);
        }
        
        $post->update($request->all());

        return response()->json([
            'message' => 'Data successfully updated',
            'data' => new PostResource($post->loadMissing(['user:id,username']))
        ]);
    }

    public function destroy($id){
        $post = Post::findOrFail($id);
        $oldImage = $post->image;
        Storage::delete('image/' . $oldImage);
        Post::destroy($id);
        return response()->json([
            'message' => 'Data successfully deleted',
            'data' => new PostResource($post->loadMissing(['user:id,username']))
        ]);
    }
}

