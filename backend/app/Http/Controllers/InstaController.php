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
    public function getUser($user){
        try{
            $users=User::select('name','username')->where('username','like','%'.$user.'%')->orWhere('name','like','%'.$user.'%')->getAll();
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
            if(Following::where([['follower_id','=',Auth::id()],['following_id','=',$request->following_id]])){
                $following=new Following;
                $following->follower_id=Auth::id();
                $following->following_id=$request->following_id;
                $following->delete();
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
    public function addPost(Request $request){
        try{
            $post=new Post;
            $post->user_id=Auth::id();
            $base64Image=$request->image;
            $image=base64_decode($base64Image);
            $imageName = time() . '.png'; 
            file_put_contents(public_path('img/' . $imageName), $image);
            $post->image_url='http://localhost:8000/img/' . $imageName;            
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

    public function getFollowingPost($following_id){
        try{
            $user_id=Auth::user();
            if(User::where([['follower_id','=',$user_id],['following_id','=',$following_id]])){
                $posts=Post::where('user_id',$following_id)->getAll();
                return response()->json([
                    'status' => 'error',
                    'posts' => $posts
                ]);
            } else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'unfollowed user'
                ]);
            }
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function likePost(Request $request){
        try{
            $user_id=Auth::user();
            if(User::where([['follower_id','=',$user_id],['following_id','=',$request->following_id]])){
                $post=Post::where([['user_id','=',$user_id],['post_id','=',$request->post_id]]);
                $likes=$post->likes;
                if(!$post){
                    $like=new Like;
                    $like->user_id=$user_id;
                    $like->post_id=$request->post_id;
                    $like->save();
                    Post::update(['likes'=>$likes++]);
                    return response()->json([
                        'status' => 'success',
                        'message' => 'liked the post'
                    ]);
                } else {
                    $like=new Like;
                    $like->user_id=$user_id;
                    $like->post_id=$request->post_id;
                    $like->delete();
                    Post::update(['likes'=>$likes--]);
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
