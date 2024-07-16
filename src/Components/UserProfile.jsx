import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UserInformation from "./UserInformation";
import UserCard from "./UserCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
const UserProfile = ()=>{
    const [credentials,setCredentials] = useState({});
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [message,setMessage] = useState();
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${backendURL}/api/blog/get`,{
                    withCredentials:true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setCredentials(response.data)
            }
            catch(e){
                setMessage("An error occurred please Refresh");
            }
        }
        fetchData();

    },[backendURL]);
    return (
        <>
            <Navbar/>
            <div className="flex flex-col md:flex-row justify-center items-center p-2 gap-4 md:gap-8 md:p-4 md:pt-28">
                <div className="w-full md:w-3/4">
                    <UserInformation data={credentials} />
                </div>
                <div className="w-full md:w-1/4 md:pt-48">
                    <UserCard user={credentials} />
                </div>
             </div>
             {message && <div className="text-red-500 text-center">{message}</div>}
             <Footer/>
        </>
       
    )
};

export default UserProfile