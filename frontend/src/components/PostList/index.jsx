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

    useEffect( ()=>{
        console.log('marc');
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
                <div>{post.likes} likes</div>
            </div>
        ))}
        </>


     );
}
 
export default PostList;