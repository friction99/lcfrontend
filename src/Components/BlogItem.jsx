import { format } from 'date-fns';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const BlogItem = ({ blog,onClick }) => {
    const formattedDate = format(new Date(blog.created_at), 'yyyy-MM-dd');
    const [username,setUsername] = useState("");
    const [error,setError] = useState();
    const truncateContent = (content,wordlimit)=>{
        const words = content.split(' ');
        return (words.length > wordlimit)?words.slice(0,wordlimit).join(' ')+'...':words.join(' ');
    }
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    useEffect(()=>{
       const fetchData = async()=>{
          try {
            const response = await axios.get(`${backendURL}/api/blog/getAuthor/${blog.author}`);
            if(response.status === 200){
                setUsername(response.data.fullname);
            }
        } catch (e) {
            setError(e.response.message);
        }
       }
       fetchData();
    })
    if(error) return <p className='my-1 font-bold text-red-600'>{error}</p>
    return (
      <div onClick={onClick} className="w-2/3 mx-auto md:w-[500px] flex flex-col md:flex-row shadow-md border border-black hover:shadow-lg cursor-pointer">
        <div className="img w-full">
          <img src={blog.image_url} alt={blog.title} className="w-full h-auto" />
        </div>
        <div className='p-2 w-full  mx-0 md:mx-4'>
          <h1 className="font-semibold text-xl md:text-2xl mt-2 md:mt-0 text-wrap">{blog.title}</h1>
          <p className="text-sm md:text-base">By {username}</p>
          <p className='text-xs my-1'>Created on {formattedDate}</p>
          <p className="mt-2 text-wrap text-sm md:text-lg">{truncateContent(blog.content, 10)}</p>
        </div>
    </div>
    );
  };
  
export default BlogItem;
  