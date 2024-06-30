import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { setUserId } from '../utils/blogSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const NewBlogForm = ({existingBlog}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(existingBlog){
            setTitle(existingBlog.title)
            setContent(existingBlog.content)
        }
    },[existingBlog])
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true); 
        const formData = new FormData();
        if(!existingBlog){
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);
            try {
                const response = await axios.post(`${backendUrl}/blogspot/post`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                dispatch(setUserId(response?.data?.blog?.author))         
                if(response.status === 201){
                    navigate('/blogspot');
                }
            } catch (e) {
                console.log('There was an error!', e);
                setMessage(`Error: ${e.response.data.message}`);
            } finally {
                setIsLoading(false); 
            }
        }
        else{
            const data = {
                title : title,
                content : content,
                img_url : existingBlog?.img_url
            }
            try {
                const response = await axios.patch(`${backendUrl}/blog/all/${existingBlog.id}`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(existingBlog?.id,response);        
                if(response.status === 202){
                    navigate('/blogspot');
                }
            } catch (e) {
                console.log('There was an error!', e);
                setMessage(`Error: ${e.response.data.message}`);
            } finally {
                setIsLoading(false); 
            }
        }
    };

    return (
        <>
            {(!existingBlog) && <Navbar />}
            <form onSubmit={handleSubmit} className="flex flex-col p-4 max-w-3xl mx-auto my-8 h-[85vh] pt-24 w-8/12">
                <label htmlFor="title" className="text-lg font-semibold mb-2">
                    Title [{title.length}/20]:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title of your Blog"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 mb-4 border rounded-lg"
                    required
                />
                
                <label htmlFor="content" className="text-lg font-semibold mb-2">
                    Content [{content.length}/2000]:
                </label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Paste your written content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 mb-4 border rounded-lg h-32"
                    required
                />
                {(!existingBlog && <div>
                    <label htmlFor="image" className="text-lg font-semibold mb-2">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="p-2 mb-4 border rounded-lg"
                        accept="image/*"
                        required
                    />
                </div>)}
                <span className='text-red-500 font-semibold my-2 '>{(message)?message:''}</span>
                <button
                    type="submit"
                    className={`p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 max-w-16 transition duration-300 ${isLoading ? 'cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                <p className='my-4 font-semibold text-red-400'>Submit your blog and wait for its approval</p>
            </form>
            {(!existingBlog) && Footer}
        </>
    );
};

export default NewBlogForm;
