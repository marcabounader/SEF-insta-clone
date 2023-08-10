import { useState } from "react";
import NavBar from "../../components/NavBar";
import './dashboard.css'
import axios from "axios";
import PostList from "../../components/PostList";
import AddPost from "../../components/AddPost";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
const Dashboard = () => {
    const navigate=useNavigate();

    if(localStorage.getItem('token')==""){
        navigate('/');
    }
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [posts,setPosts]=useState([]);
    const [myPosts,setMyPosts]=useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const handleOpenAddModal = () => setIsAddModalOpen(true)
    const handleCloseAddModal = () => setIsAddModalOpen(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const handleOpenSearchModal = () => setIsSearchModalOpen(true)
    const handleCloseSearchModal = () => setIsSearchModalOpen(false)

    const handleMyPosts = (myPost) =>{
        if(myPost){
            setMyPosts(true)
        } else{
            setMyPosts(false)
        }
    }

    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    };


    const handlelike = async (post_id,following_id) => {
        try{
            const response=await axios.post(`http://localhost:8000/api/like-post/`,{post_id:post_id,following_id:following_id},config);
            if(response.data['status']=="success"){
                console.log(response.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    const logout = async () =>{
        try{
            const response=await axios.post(`http://localhost:8000/api/logout`,{},config);
            if(response.data['status']=="success"){
                localStorage.clear();
                navigate('/');
            }
        }catch(e){
            console.log(e);
        }
    }
    return ( 
        <div className="dashboard-container flex-row">
            <NavBar className='side-nav' handleOpenSearchModal={handleOpenSearchModal} handleMyPosts={handleMyPosts} handleOpenAddModal={handleOpenAddModal} logout={logout}/>
            <SearchBar isOpen={isSearchModalOpen} handleCloseSearchModal={handleCloseSearchModal} config={config}></SearchBar>
            <AddPost isOpen={isAddModalOpen} handleCloseAddModal={handleCloseAddModal}></AddPost>
            <div className="post-container flex-row center">
                <PostList setPosts={setPosts} posts={posts} handlelike={handlelike} myPosts={myPosts}/>
            </div>
        </div>

    );
}
 
export default Dashboard;