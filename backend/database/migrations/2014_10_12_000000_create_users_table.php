<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->mediumText('image_url');
            $table->integer('likes')->default(0);
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
        Schema::create('followings', function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('follower_id');
            $table->unsignedBigInteger('following_id');
            $table->foreign('follower_id')->references('id')->on('users');
            $table->foreign('following_id')->references('id')->on('users');
        });
        Schema::create('likes', function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('follower_id');
            $table->unsignedBigInteger('post_id');
            $table->foreign('follower_id')->references('id')->on('users');
            $table->foreign('post_id')->references('id')->on('posts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
