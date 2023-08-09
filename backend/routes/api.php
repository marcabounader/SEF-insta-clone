<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\InstaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::group(["middleware" => "auth:api"], function () {
    Route::controller(InstaController::class)->group(function () {
        Route::get('get-user/{search}','getUser');
        Route::post('follow','follow');
        Route::get('get-followings','getFollowings');
        Route::get('get-posts','getPosts');
        Route::post('add-post','addPost');
        Route::get('get-following-posts/{following_id}','getFollowingPosts');
        Route::post('like-post','likePost');
    });
});