import axios from "axios";
import { useEffect } from "react";

const PostList = ({setPosts,posts,handlelike,myPosts}) => {

    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    };
    const fetchPosts = async ()=>{
            try{
                const response=await axios.get(`http://localhost:8000/api/get-following-posts/`,config);
                if(response.data['status']=="success"){
                    setPosts([...response.data.posts]);

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
        <>
        {posts.map((post)=>(
            <div className="post flex-col" key={post.id}>
                <img src={post.image_url}/>
                {!myPosts && <i className="fa-regular fa-heart" onClick={() => {handlelike(post.id,post.user_id)}}></i>}
                <div>{post.likes} likes {myPosts && <i className="fa-solid fa-trash" id={post.id} onClick={handleDeletePost}></i>}</div>
            </div>
        ))}
        </>


     );
}
 
export default PostList;