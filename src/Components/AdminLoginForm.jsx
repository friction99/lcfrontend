import React, { useRef, useState } from 'react';
import { loginSuccess } from '../utils/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminLoginForm = () => {
    const [message, setMessage] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log(username,password);
        const data = {
            username,
            password
        }
        console.log(data);
        try{
            const response = await axios.post(`${backendUrl}/admin/login`,data);
            console.log(response);
            if(response.status === 200){
                dispatch(loginSuccess(response.data.access_token));
                navigate('/adminpanel')
            }
        }catch(e){
            console.log(e);
            setMessage('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-50 h-screen">
            <form onSubmit={handleClick} className="flex flex-col w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded shadow-md hover:shadow-lg">
                <div className="text-center flex flex-col">
                    <span className="text-2xl font-bold mb-2">Admin Login</span>
                    <span className="text-lg mb-4">Sign In to Admin Panel</span>
                    <span className="text-md mb-6">Enter your username and password</span>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="username" className="mb-2">Username</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username' 
                        placeholder="e.g admin" 
                        ref={usernameRef}
                        className="border border-black p-4 mb-4 rounded"
                    />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        ref={passwordRef} 
                        className="border border-black p-4 mb-4 rounded"
                    />
                </div>
                <p className="my-1 font-bold text-red-600">{message}</p>
                <button onClick={handleClick} className="p-4 mb-4 bg-yellow-400 rounded">Sign In</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;