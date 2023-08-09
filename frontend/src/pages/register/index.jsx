import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ReactComponent as Logo } from '../../instagram-logo.svg'
import './register.css'
const Register = () => {
    const [data,setData]=useState({name:"",username:"",email:"",password:""});
    const {name,username,email,password}=data;
    const navigate=useNavigate();

    const handleDataChange = (e)=>{
        setData({...data,[e.target.id]:e.target.value});
    }
    const handleDataSubmit = async ()=>{
        try{
            console.log(data);
            const response=await axios.post("http://localhost:8000/api/register",data);
            if(response.data['status']=="success"){
                navigate(`/`)
            }
        }catch(e){
            console.log(e);
        }
    }
    return ( 
    <div className="flex-row center align-center">
                <div className="register flex-col center">
                    <div className='flex-col'>
                        <Logo className="insta-logo" alt="insta logo"/>
                        <div className=' register-form flex-col '>
                            <input type="text" id="email" value={email} placeholder="Email" onChange={handleDataChange}/>
                            <input type="text" id="name" value={name} placeholder="Full Name" onChange={handleDataChange}/>
                            <input type="text" id="username" value={username} placeholder="Username" onChange={handleDataChange}/>
                            <input type="password" id="password" value={password} placeholder="Password" onChange={handleDataChange}/>
                            <button className="register-btn" onClick={handleDataSubmit}>Sign up</button>
                        </div>
                    </div>
            </div>
    </div> );
}
 
export default Register;