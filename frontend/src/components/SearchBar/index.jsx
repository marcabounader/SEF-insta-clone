import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import './search.css';
import { useNavigate } from 'react-router-dom';
const SearchBar = ({isOpen,handleCloseSearchModal,config}) => {
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState("");
    const navigate=useNavigate();
    if(localStorage.getItem('token')==""){
        navigate('/');
    }
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
        const following_id=e.target.id;
        try{
            const response=await axios.post(`http://localhost:8000/api/follow/`,{following_id:following_id},config);
            if(response.data['status']=="success"){
                console.log(response.data);
            }
        }catch(e){
            console.log(e);
        }
    };
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseSearchModal}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
            <div className="search-bar flex-col around">

            <input type="text" id="search" className="self-center" placeholder="Username or Name" onKeyUp={handleSearchSubmit}/>
            <div className='user-container'>
            <div className="users flex-col around">
                {users.map((user)=>(
                    <div className="user-card self-center" key={user.id}>
                        <h6 className="flex-row">{user.name} </h6>
                        <div className="flex-row between">{user.username}<i id ={user.id} className="fa-solid fa-user-plus" onClick={handleFollowSubmit}></i></div>
                    </div>
                ))}
            </div>
            </div>
            </div>
      </Modal>    
     );
}
 
export default SearchBar;