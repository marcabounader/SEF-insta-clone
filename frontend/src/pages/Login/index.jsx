import { useState } from 'react';
import { ReactComponent as Logo } from '../../instagram-logo.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    const {email,password}=credentials;
    const navigate=useNavigate();

    const handleCredChange = (e)=>{
        setCredentials({...credentials,[e.target.id]:e.target.value});
    }
    const handleCredSubmit = async ()=>{
        try{
            const response=await axios.post("http://localhost:8000/api/login",credentials);
            if(response.data['status']=="success"){
                localStorage.setItem('name',response.data['name']);
                localStorage.setItem('token',response.data['token']);
                navigate(`/dashboard`)
            }
        }catch(e){
            console.log(e);
        }
    }
    return ( 
    <div className="form-container flex-row center align-center">
        <div className="wrapper flex-row">
                <img className="phone-image" src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones-2x.png?__makehaste_cache_breaker=73SVAexZgBW" alt="insta app"></img>
                <div className="login flex-col center">
                    <div className='flex-col'>
                    <Logo className="insta-logo" alt="insta logo"/>
                        <div className="login-form flex-col center">
                            <input type="text" id="email" value={email}placeholder="Email" onChange={handleCredChange}/>
                            <input type="password" id="password" value={password} placeholder="Password" onChange={handleCredChange}/>
                            <button className="login-button" onClick={handleCredSubmit}>Log in</button>
                        </div>
                    </div>

                    <div className="flex-row center">
                        <p>Do you have an account?<span className="sign-up" onClick={() => navigate('./register')}>Sign up</span></p>
                    </div>
                </div>
        </div>
    </div> );
}
 
export default Login;