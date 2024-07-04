import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import UserInformation from "./UserInformation";
import UserCard from "./UserCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
const UserProfile = ()=>{
    const {id} = useParams();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [credentials,setCredentials] = useState({});
    const token = useSelector((state) => state.auth.token);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`${backendUrl}/api/blog/get/${id}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setCredentials(response.data)
        }
        fetchData();
    },[backendUrl,id,token]);
    return (
        <>
            <Navbar/>
            <div className="flex flex-row justify-center items-start gap-8 p-4 pt-28">
                <div className="w-3/4">
                    <UserInformation data={credentials} />
                </div>
                <div className="w-1/4 pt-48">
                    <UserCard user={credentials} />
                </div>
             </div>
             <Footer/>
        </>
       
    )
};

export default UserProfile