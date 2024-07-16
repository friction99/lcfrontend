import Auth from "../Components/Auth";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const LoginPage = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [message,setMessage] = useState();
  useEffect(()=>{
    const CheckLoggedIn = async()=>{
        try {
            const response = await axios.get(`${backendURL}/api/check-auth`, { withCredentials: true });
            if (response.data.message === 'Authenticated') {
               navigate('/blogs')
            }
          }catch (error) {
            setMessage("Login to see the blogs");
          }
    };
    CheckLoggedIn();
},[backendURL,navigate])
  return (
    <div>
        <Navbar />
        <div className="pt-20 p-4">
          <Auth />
          <div>
            <span className="my-1 font-bold text-red-600 flex justify-center items-center">{message}</span>
          </div>
        </div>
        <Footer/>
    </div>
  );
};

export default LoginPage;
