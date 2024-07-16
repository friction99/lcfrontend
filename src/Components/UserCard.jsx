import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearBlogState } from '../utils/blogSlice';
import { clearAuthState } from '../utils/authSlice';
const UserCard = ({ user }) => {
    const [link,setLink] = useState("");
    const navigate = useNavigate();
    const [message,setMessage] = useState();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();
    useEffect(()=>{
        setLink(user.img_url);
    },[setLink,user.img_url,user]);
    const handleLogout = async () => {
        try {
          await axios.post(`${backendURL}/api/logout`, {}, { withCredentials: true });
          dispatch(clearAuthState());
          dispatch(clearBlogState());
          navigate('/Login');
        } catch (error) {
            setMessage(error?.response?.data?.message || "Authentication failed please refresh");
        }
      };
    return (
        <div className="w-full max-w-sm mx-auto bg-slate-50 shadow-md rounded-lg p-6 relative hover:shadow-lg">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 ">
                {user.img_url ? (
                    <img
                        src={link}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xl">No Image</span>
                    </div>
                )}
            </div>
            <div className="mt-20">
                <h2 className="text-xl font-bold text-center">{user.fullname}</h2>
                <p className="text-center text-gray-600">{user.email}</p>
                <p className="mt-4 text-center">{user.aboutme}</p>
                <p className='mt-4 text-center'>Blogs Submitted:{user?.blogs_submitted?.length}</p>
                <p className='mt-4 text-center'>Blogs Published:{user?.blogs?.length}</p>
                <button
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {message && <p className='mt-4 text-center text-red-400'>{message}</p>}
            </div>
         </div>    
    );
};

export default UserCard;
