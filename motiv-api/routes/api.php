<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register',[UserController::class, 'Register']);
Route::post('/login',[UserController::class, 'Login']);

Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('/post',[PostController::class, 'store']);
    Route::patch('/post/{id}',[PostController::class, 'update'])->middleware('check.post.owner');
    Route::delete('/post/{id}', [PostController::class, 'destroy'])->middleware('check.post.owner');
    
    Route::post('/comment', [CommentController::class, 'store']);
    Route::patch('/comment/{id}', [CommentController::class, 'update'])->middleware('check.comment.owner');
    Route::delete('/comment/{id}', [CommentController::class, 'destroy'])->middleware('check.comment.owner');

});
Route::get('/posts', [PostController::class, 'index']);
Route::get('/post/{id}', [PostController::class, 'show']);

Route::get('/storage/{path}', function ($path) {

    $filePath = storage_path('app/image/' . $path);

    if (!file_exists($filePath)) {
        abort(404);
    }

    return response()->file($filePath);
})->where('path', '.*');



