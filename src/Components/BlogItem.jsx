import { format } from 'date-fns';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const BlogItem = ({ blog,onClick }) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const formattedDate = format(new Date(blog.created_at), 'yyyy-MM-dd');
    const [username,setUsername] = useState("");
    const truncateContent = (content,wordlimit)=>{
        const words = content.split(' ');
        return (words.length > wordlimit)?words.slice(0,wordlimit).join(' ')+'...':words.join(' ');
    }
    useEffect(()=>{
       const fetchData = async()=>{
          try {
            const response = await axios.get(`${backendUrl}/api/blog/get/${blog.author}`);
            if(response.status === 200){
                setUsername(response.data.fullname);
            }
        } catch (e) {
            console.error("Error", e);
        }
       }
       fetchData();
    })
    return (
      <div onClick={onClick} className="w-[500px] flex flex-row shadow-md border border-black hover:shadow-lg cursor-pointer">
        <div className="img w-2/3">
            <img src={blog.image_url} alt={blog.title} className="" />
        </div>
        <div className='p-2 w-2/3 mx-4'>
          <h1 className="font-semibold text-2xl mt-4 text-wrap">{blog.title}</h1>
          <p>By-{username}</p>
          <p className='text-xs my-1'>Created at {formattedDate}</p>
          <p className="mt-4 text-wrap text-lg">{truncateContent(blog.content,10)}</p>
        </div>
      </div>
    );
  };
  
export default BlogItem;
  