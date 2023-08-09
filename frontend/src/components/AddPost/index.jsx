import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';
import './add.css';

const AddPost = ({isOpen,handleCloseAddModal}) => {
  // const [file,setFile]=useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const config={
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result.split(',')[1]; // Extract base64 part
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
    const handleAddPost = async ()=>{
      if (selectedFile) {
        try{
          const response=await axios.post(`http://localhost:8000/api/add-post/`,{image:selectedFile},config);
          if(response.data['status']=="success"){
              // setPosts([...response.data.posts]);
              console.log(response.data);
          }
        }catch(e){
            console.log(e);
        }
      }
    }
    console.log(selectedFile);
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseAddModal}
        className="modal"
        overlayClassName="overlay"
      >
            <div className='image-container flex-col start align-center'>
              <label>Upload image:</label><br/>
              <input type="file" onChange={handleFileChange}/>
             
            <button onClick={handleAddPost}>Add Post</button>
            </div>
      </Modal>     
      );
}
 
export default AddPost;