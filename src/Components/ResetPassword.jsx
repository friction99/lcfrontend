import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
            return setMessage("Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.");
        }
        try {
            const response = await axios.post(`${backendUrl}/reset_password/${token}`, { password });
            console.log(response);
            if (response.status === 200) {
                setMessage("Password updated successfully. Please log in.");
                setTimeout(() => {
                    navigate('/blog');
                }, 2000);
            }
        } catch (e) {
            console.log(e);
            setMessage(e?.response?.data?.message || "An error occurred");
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center bg-slate-50 h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded shadow-md hover:shadow-lg">
                <div className="text-center flex flex-col">
                    <span className="text-md mb-6">Enter your new password</span>
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-black p-4 mb-4 rounded"
                    />
                </div>
                <p className="my-1 font-bold text-red-600">{message}</p>
                <button type="submit" className="p-4 mb-4 bg-yellow-400 rounded">RESET</button>
            </form>
         </div>
         <Footer/>
        </>
    )
};

export default ResetPassword;
