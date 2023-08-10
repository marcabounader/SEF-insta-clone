import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './post.css';
const PostList = ({setPosts,posts,handlelike,myPosts}) => {
    const [followingPosts,setFollowingPosts]=useState([]);
    const navigate=useNavigate();
    if(localStorage.getItem('token')==""){
        navigate('/');
    }
    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    };
    
    const fetchPosts = async ()=>{
            try{
                const response=await axios.get(`http://localhost:8000/api/get-following-posts/`,config);
                let new_posts=[];
                if(response.data['status']=="success"){
                    const data=response.data.posts;
                    data.forEach(user => {
                        const posts=user.posts;
                        for (let post in posts) {
                            let username=user.username;
                            let user_post={username:username,...posts[post]};
                            new_posts.push(user_post);
                        }
                    });
                    setFollowingPosts([...new_posts]);
                }  

            }catch(e){
                console.log(e);
            }

    }

    const fetchMyPosts = async ()=>{
        try{
            const response=await axios.get(`http://localhost:8000/api/get-posts/`,config);
            if(response.data['status']=="success"){
                setPosts([...response.data.posts]);
            } 

        }catch(e){
            console.log(e);
        }
    }

    const handleDeletePost = async (e)=>{
        try{
            const post_id=e.target.id;
            const response=await axios.delete(`http://localhost:8000/api/remove-post/${post_id}`,config);
            if(response.data['status']=="success"){
                let new_data=posts.filter(item => item.id != post_id);
                setPosts([...new_data]);
            }

        }catch(e){
            console.log(e);
        } 
    }
    useEffect( ()=>{
        if(!myPosts){
            fetchPosts();

        } else {
            fetchMyPosts();

        }
    },[myPosts]);

    return ( 
        <div className="posts">
        {myPosts ? posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={post.image_url}/>
                <div>{post.likes} likes <i className="fa-solid fa-trash" id={post.id} onClick={handleDeletePost}></i></div>
            </div>
        )): 
        !myPosts && followingPosts.map((post)=>(
            <div className="post" key={post.id}>
                <h6>{post.username}</h6>
                <img src={post.image_url}/>
                <div><i className="fa-regular fa-heart" onClick={() => {handlelike(post.id,post.user_id)}}></i> {post.likes} likes </div>
            </div>
        ))
        }

        </div>


     );
}
 
export default PostList;