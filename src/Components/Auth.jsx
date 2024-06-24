import {useState,useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { loginSuccess,loginFailure } from "../utils/authSlice";
import Validate from "../utils/Validate";
import axiosInstance from "../utils/axiosConfig";
import { useSelector } from "react-redux";
const Auth = () => {
    const [signedIn,setSignedIn] = useState(true);
    const [forgotedPassword,setForgotPassword] = useState(true);
    const [message,setMessage] = useState(null); 
    const username = useRef(null);
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
    const forgotPassword = ()=>{
        setForgotPassword(!forgotedPassword);
    };
    const handleClick = async()=>{
        const invalid = Validate(email.current.value,password.current.value);
        setMessage(invalid);
        if(invalid){
            dispatch(loginFailure(invalid));
        }
        if(signedIn){
            const data = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }   
            try{
                const response = await axiosInstance.post(`${backendUrl}/blog/register`,data,{
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                if (response.status === 201){
                    if(response.data.access_token){
                        dispatch(loginSuccess(response.data.access_token))
                    }
                    navigate('/blogspot')
                }
            }catch(error){
                setMessage("Registration failed");
                dispatch(loginFailure(error))
            }
        }else{
            const data = {
                email:email.current.value,
                password:password.current.value
            }
            try{
                const response = await axiosInstance.post(`${backendUrl}/blog/login`,data,{
                    headers:{
                        'Content-Type':'application/json',
                    }
                })
                if (response.status === 200){
                    if(response.data.access_token){
                        dispatch(loginSuccess(response.data.access_token))
                    }
                    navigate('/blogspot')
                } 
            }catch(error){
                dispatch(loginFailure(error))
            }
        }
    };
    return (
        <div className="flex items-center justify-center bg-slate-50 h-screen">
            <form onSubmit={(e)=>{e.preventDefault()}}className="flex flex-col w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-6 rounded shadow-md hover:shadow-lg">
                <div className="text-center flex flex-col">
                    <span className="text-2xl font-bold mb-2">{!forgotedPassword?'':'Welcome'}</span>
                    <span className="text-lg mb-4">{(!forgotedPassword)?'':'Sign In to Your Account'}</span>
                    <span className="text-md mb-6">{(!forgotedPassword)?'Enter your email':"Let's get you Signed In to Our Blogs"}</span>
                </div>
                {signedIn && forgotedPassword &&
                    <div className="w-full flex flex-col"><label htmlFor="username" className="mb-2 ">User Name</label>
                        <input 
                            type='text' 
                            name='username' 
                            id='username' 
                            placeholder="e.g wakanadaforever123" 
                            ref={username}
                            className="border border-black p-4 mb-4 rounded"
                        />
                    </div>
                }                
                <label htmlFor="email" className="mb-2">Email Address</label>
                        <input 
                            type='email' 
                            name='email' 
                            id='email' 
                            placeholder="e.g wakanada@gmail.com"
                            ref={email} 
                            className="border border-black p-4 mb-4 rounded"
                />           
                {
                    forgotedPassword && 
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
                <span onClick={forgotPassword} className="cursor-pointer mb-4">{(forgotedPassword)?((!signedIn)?'Forgot Password?':''):'Remember Password?'}</span>
                <button onClick={handleClick} className="p-4 mb-4 bg-yellow-400 rounded">{(forgotedPassword)?((signedIn)?'SignUp':'SignIn'):'Send'}</button>
                <span onClick={signin} className="cursor-pointer">{(forgotedPassword)?((signedIn)?"Already have an account? SignIn":"Don't have an Account? SignUp"):''}</span>
            </form>
        </div>
    )
};

export default Auth;
