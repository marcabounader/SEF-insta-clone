<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Following extends Model
{
    use HasFactory;
    
    public $timestamps=false;

    public function posts(): hasmany
    {
        return $this->hasMany(Post::class,'user_id','following_id')
    } 
}
