import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setteradmin } from '../utils/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AdminLoginForm = () => {
    const [message, setMessage] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.admin_token);

    useEffect(() => {
        if (token) {
            navigate("/adminpanel");
        }
    }, [token, navigate]);

    const handleClick = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        console.log(username, password);
        const data = {
            username,
            password
        };
        try {
            const response = await axios.post(`/api/admin/login`, data);
            if (response.status === 200) {
                dispatch(setteradmin(response.data.access_token));
                navigate("/adminpanel");
            }
        } catch (e) {
            setMessage('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-50 h-screen p-4">
            <form onSubmit={handleClick} className="flex flex-col w-full max-w-md p-6 rounded shadow-md hover:shadow-lg bg-white">
                <div className="text-center flex flex-col">
                    <span className="text-2xl font-bold mb-2">Admin Login</span>
                    <span className="text-lg mb-4">Sign In to Admin Panel</span>
                    <span className="text-md mb-6">Enter your username and password</span>
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="username" className="mb-2">Username</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username' 
                        placeholder="e.g admin" 
                        ref={usernameRef}
                        className="border border-black p-4 rounded"
                    />
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        ref={passwordRef} 
                        className="border border-black p-4 rounded"
                    />
                </div>
                <p className="my-1 font-bold text-red-600">{message}</p>
                <button type="submit" className="p-4 bg-yellow-400 rounded">Sign In</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
