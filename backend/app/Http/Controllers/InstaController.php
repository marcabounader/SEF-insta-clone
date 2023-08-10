<?php

namespace App\Http\Controllers;

use App\Models\Following;
use App\Models\Like;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class InstaController extends Controller
{
    public function getUser($search){
        try{
            $users=User::select('id','name','username')->where([['username','like','%'.$search.'%'],['id','!=',Auth::id()]])->orWhere('name','like','%'.$search.'%')->get();
            return response()->json([
                'status' => 'success',
                'users' => $users
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function follow(Request $request){
        try{
            if(Auth::id()==$request->following_id){
                return response()->json([
                    'status' => 'error',
                    'message' => 'cannot follow yourself'
                ]);
            }
            $followings=Following::where([['follower_id','=',Auth::id()],['following_id','=',$request->following_id]])->first();

            if(!$followings==""){
                $followings->delete();
                return response()->json([
                    'status' => 'success',
                    'message' => 'unfollowed user'
                ]);
            }else{
                $following=new Following;
                $following->follower_id=Auth::id();
                $following->following_id=$request->following_id;
                $following->save();
                return response()->json([
                    'status' => 'success',
                    'message' => 'followed user'
                ]);
            }
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }



    
    public function getFollowings(){
        $user=Auth::user();
        try{
            $user=Auth::user();
            $users=$user->followings;

            return response()->json([
                'status' => 'success',
                'users' => $users
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getPosts(){
        try{
            $user=Auth::user();
            $posts=$user->posts;
            return response()->json([
                'status' => 'success',
                'posts'=>$posts
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function addPost(Request $request){
        try{
            $post=new Post;
            $post->user_id=Auth::id();
            $base64Image=$request->image;
            $image=base64_decode($base64Image);
            $imageName = time() . '.png'; 
            file_put_contents(public_path('img/' . $imageName), $image);
            $post->image_url='http://localhost:8000/img/' . $imageName;  
            $post->save();
            return response()->json([
                'status' => 'success'
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function removePost($post_id){
        try{
            $user_id=Auth::id();
            Post::where([['user_id', '=', $user_id],['id', '=', $post_id]])->delete();
            return response()->json([
                'status' => 'success'
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getFollowingPosts(){
        try{
            $user=Auth::user();
            $user_posts=$user->followings()->with('posts')->get();
            foreach($user_posts as $user_post){
                if(!count($user_post->posts)==0){
                    $new_posts[]=$user_post;
                }
            }
            return response()->json([
                'status' => 'success',
                'posts' => $new_posts
            ]);
        
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function likePost(Request $request){
        try{
            $user_id=Auth::id();
            $following=Following::where([['follower_id','=',$user_id],['following_id','=',$request->following_id]])->first();
            if($following!=""){
                $like=Like::where([['follower_id','=',$user_id],['post_id','=',$request->post_id]])->first();
                $post=Post::where('id',$request->post_id)->first();
                $likes=$post->likes;
                if($like==""){
                    $like=new Like;
                    $like->follower_id=$user_id;
                    $like->post_id=$request->post_id;
                    $like->save();
                    $likes+=1;
                    $post->update(['likes'=>$likes]);
                    return response()->json([
                        'status' => 'success',
                        'message' => 'liked the post'
                    ]);
                } else {
                    $like->delete();
                    $likes-=1;
                    $post->update(['likes'=>$likes]);
                    return response()->json([
                        'status' => 'success',
                        'message' => 'unliked the post'
                    ]);
                }

            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'unfollowed user'
                ]);
            }
        }
        catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

}
