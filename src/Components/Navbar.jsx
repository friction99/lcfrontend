import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const id = useSelector((state) => state.auth.user_id);
    const url = `/blogspot/userProfile/${id}`
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [img,setImg] = useState("");
    useEffect(()=>{
        const fetchData = async()=>{
            if(id){
                try {
                    const response = await axios.get(`${backendUrl}/api/blog/get/${id}`,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if(response.status === 200){
                        setImg(response.data.img_url);
                    }
                } catch (e) {
                    console.error("Error", e);
                }
            }
            }
        fetchData();
    },[id,backendUrl,token]);
    return (
        <div className="fixed top-0 left-0 right-0 w-full bg-slate-50 z-50 rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 text-lg">
                <div className="flex items-center gap-24">
                    <ul className="flex space-x-24">
                        <li className="hover:underline"><Link to="/">Home</Link></li>
                        <li className="hover:underline"><Link to="/about">About</Link></li>
                        <li className="hover:underline"><Link to="/members">Members</Link></li>
                        <li className="hover:underline"><Link to="/events">Events</Link></li>
                    </ul>
                    <img src="/LC_LOGO_black.png" alt="logo" className="w-70 h-20 ml-12" />
                </div>
                <ul className="flex space-x-4 items-center">
                    <li className="hover:underline">
                        <Link to="/blog">Blog</Link>
                    </li>
                    {token && (
                        <li className="hover:underline">
                            <Link to="/newblog">New Blog</Link>
                        </li>
                    )}
                    {(img && token)?(
                        <li className="rounded-full overflow-hidden w-12 h-12 hover:underline">
                            <Link to={url}>
                                <img src={img} alt="User" className="w-full h-full object-cover" />
                            </Link>
                        </li>
                    ):(
                        <li>
                            <Link to={url}>
                                User
                            </Link>
                        </li>
                    )}
                    <li className="hover:underline">
                        <Link to = '/admin/login'>Admin</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
