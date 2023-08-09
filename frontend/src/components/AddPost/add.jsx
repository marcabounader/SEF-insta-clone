import Modal from 'react-modal';
import axios from 'axios';
const defaultState = {
    firstName: "",
    lastName: "",
    email: "",
    longitude: -0.09,
    latitude: 51.505,
}

const AddPost = ({isOpen,handleCloseAddModal}) => {
    const [data, setData] = useState(defaultState)

    // const handleDataChange = (e)=>{
    //     setData({...data, [e.target.name]: e.target.value});
    // }

    const handleAddPost = async ()=>{
        
          try{
            const response=await axios.post(`http://localhost:8000/api/add-post/`,config);
            if(response.data['status']=="success"){
                // setPosts([...response.data.posts]);
                console.log(response.data);
            }

        }catch(e){
            console.log(e);
        }
        
      }
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseAddModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className='form-container'>
            <div>
              <label>First name:</label><br/>
              <input type="image" name='image' value={} onChange={handleDataChange}/>
            </div>
          </div>
  
        <div className='buttons-container'>
          <button onClick={handleCloseAddModal}>Cancel</button>
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      </Modal>     
      );
}
 
export default AddPost;