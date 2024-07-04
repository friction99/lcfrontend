import {useState,useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { loginSuccess,loginFailure } from "../utils/authSlice";
import { setterid } from "../utils/authSlice";
import Validate from "../utils/Validate";
import axiosInstance from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import validateEmail from "../utils/validateEmail";
const Auth = () => {
    const [signedIn,setSignedIn] = useState(false);
    const [forgotedPassword,setForgotPassword] = useState(false);
    const [message,setMessage] = useState(null);
    const fullname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        if (token) {
            navigate('/blogspot');
        }
    }, [token, navigate]);
    const signin = () =>{
        setSignedIn(!signedIn);
    }
    const forgotPassword = async()=>{
        setForgotPassword(!forgotedPassword);
    };
    const handleClick = async()=>{
        const invalid = (!forgotedPassword)?Validate(email.current.value,password.current.value):validateEmail(email.current.value);
        setMessage(invalid);
        if(invalid){
            return dispatch(loginFailure(invalid));
        }
        if(!signedIn){
            const data = {
                fullname:fullname.current.value,
                email:email.current.value,
                password:password.current.value
            }   
            try{
                const response = await axiosInstance.post(`${backendUrl}/api/blog/register`,data,{
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                if (response.status === 201){
                    if(response.data.access_token){
                        setSignedIn(false);
                    }
                }
            }catch(error){
                setMessage(error?.response?.data?.message);
            }
        }
        else if(signedIn && (!forgotedPassword)){
            const data = {
                email:email.current.value,
                password:password.current.value
            }
            try{
                const response = await axiosInstance.post(`${backendUrl}/api/blog/login`,data,{
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                if (response.status === 200){
                    if(response.data.access_token){
                        dispatch(loginSuccess(response.data.access_token))
                        dispatch(setterid(response.data.id)) 
                    }
                    navigate('/blogspot')
                } 
            }catch(error){
                setMessage(error?.response?.data?.message);
            }
        }
        else if(forgotPassword){
            try{
                const response = await axiosInstance.post(`${backendUrl}/api/forgot_password`,{email:email.current.value})
                if(response.status === 200){
                    setMessage('An email has been sent to your registered email address. Please check your inbox.');
                }
            }catch(e){
                console.error(e);
                setMessage(e.message);
            }
        }
    };
    return (
        <div className="flex items-center justify-center bg-slate-50 h-screen">
            <form onSubmit={(e)=>{e.preventDefault()}}className="flex flex-col w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded shadow-md hover:shadow-lg">
                <div className="text-center flex flex-col">
                    <span className="text-2xl font-bold mb-2">{forgotedPassword?'':'Welcome'}</span>
                    <span className="text-lg mb-4">{(forgotedPassword)?'':'Sign In to Your Account'}</span>
                    <span className="text-md mb-6">{(forgotedPassword)?'Enter your email':"Let's get you Signed In to Our Blogs"}</span>
                </div>
                {(!signedIn) && (!forgotedPassword) &&
                    <div className="w-full flex flex-col"><label htmlFor="username" className="mb-2 ">Full Name</label>
                        <input 
                            type='text' 
                            name='fullname' 
                            id='fullname' 
                            placeholder="e.g Albus Potter" 
                            ref={fullname}
                            className="border border-black p-4 mb-4 rounded"
                        />
                    </div>
                }                
                {
                    <div className="w-full flex flex-col">
                        <label htmlFor="email" className="mb-2">Email Address</label>
                                <input 
                                    type='email' 
                                    name='email' 
                                    id='email' 
                                    placeholder="e.g wakanada@gmail.com"
                                    ref={email} 
                                    className="border border-black p-4 mb-4 rounded"
                                />          
                    </div> 
                }
                {
                    (!forgotedPassword) && 
                        <div className="w-full flex flex-col">
                            <label htmlFor="password" className="mb-2">Password</label>
                            <input 
                                type='password' 
                                name='password' 
                                id='password'
                                ref={password} 
                                className="border border-black p-4 mb-4 rounded"
                            />
                        </div>
                }
                <p className="my-1 font-bold text-red-600">{message}</p>
                <span onClick={forgotPassword} className="cursor-pointer mb-4">{(!forgotedPassword)?((signedIn)?'Forgot Password?':''):'Remember Password?'}</span>
                <button onClick={handleClick} className="p-4 mb-4 bg-yellow-400 rounded">{(!forgotedPassword)?((!signedIn)?'SignUp':'SignIn'):'Send'}</button>
                <span onClick={signin} className="cursor-pointer">{(!forgotedPassword)?((!signedIn)?"Already have an account? SignIn":"Don't have an Account? SignUp"):''}</span>
            </form>
        </div>
    )
};

export default Auth;
