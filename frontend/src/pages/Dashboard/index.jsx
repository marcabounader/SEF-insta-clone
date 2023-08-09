import { useState } from "react";
import NavBar from "../../components/NavBar";
import './dashboard.css'
import axios from "axios";
const Dashboard = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search,setSearch]=useState("");
    const [users,setUsers]=useState([]);
    const handleSearch = () =>{
        if(isSearchOpen){
            setIsSearchOpen(false)
        } else{
            setIsSearchOpen(true)
        }
    }

    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    };
    const handleSearchSubmit = async (event)=>{
        setSearch(event.target.value);
        if (event.key === "Enter") {
            try{
                const response=await axios.get(`http://localhost:8000/api/get-user/${search}`,config);
                if(response.data['status']=="success"){
                    setUsers([...response.data.users])
                }
            }catch(e){
                console.log(e);
            }
        }

    }

    const handleFollowSubmit = async (e)=>{
        const $following_id=e.target.id;
        try{
            const response=await axios.post(`http://localhost:8000/api/follow/`,{following_id:$following_id},config);
            if(response.data['status']=="success"){
                console.log('marc');
            }
        }catch(e){
            console.log(e);
        }
    };
    return ( 
        <div className="dashboard-container flex-column">
            <div className="side-container flex-row start">
                <NavBar className='side-nav' handleOpenSearch={handleSearch}/>
                {
                    isSearchOpen && <div className="search-bar flex-col align-center">

                        <input type="text" id="search" placeholder="Username or Name" onKeyUp={handleSearchSubmit}/>
                        <div className="users">
                            {users.map((user)=>(
                                <div className="user-card" key={user.id}>
                                    <h4 className="flex-row around">{user.name} </h4>
                                    <div className="flex-row around">{user.username}<i id ={user.id} className="fa-solid fa-plus" onClick={handleFollowSubmit}></i></div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}
 
export default Dashboard;