import Auth from "../Components/Auth";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BlogPage = ()=>{
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/blogspot');
        }
    }, [token,navigate]);
    return(
        <div>
            <Navbar/>
            <div className="pt-20 p-4">
                <Auth/>
                <Footer/>
            </div>
        </div>
    )
}
export default BlogPage