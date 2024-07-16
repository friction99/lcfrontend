import React, { useState } from 'react';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
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
                const response = await axios.post(`${backendURL}/api/blogspot/post`, formData, {
                    withCredentials:true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response);
                if(response.status === 201){
                    dispatch(setUserId(response?.data?.blog?.author))
                    setMessage("Blogpost submitted successfully,wait for its Aprroval")   
                }
            } catch (e) {
                setMessage(`An Authentication Error occured please Refresh`);
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
                const response = await axios.patch(`${backendURL}/api/blog/all/${existingBlog.id}`, data, {
                    'withCredentials': true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });     
                if(response.status === 202){
                    navigate('/blogspot');
                }
            } catch (e) {
                setMessage(`Error: ${e.message}`);
            } finally {
                setIsLoading(false); 
            }
        }
    };

    return (
        <>
            {(!existingBlog) && <Navbar />}
            <form onSubmit={handleSubmit} className="flex flex-col p-4 max-w-3xl mx-auto my-8 h-auto md:h-[85vh] pt-24 w-full md:w-8/12">
            <label htmlFor="title" className="text-lg font-semibold mb-2">
                Title [{title.length}/50]:
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
                Content [{content.length}/5000]:
            </label>
            <textarea
                id="content"
                name="content"
                placeholder="Paste your written content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 mb-4 border rounded-lg h-32 md:h-64"
                required
            />
            {!existingBlog && (
                <div>
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
                </div>
            )}
            <span className='text-red-500 font-semibold my-2'>{message ? message : ''}</span>
            <button
                type="submit"
                className={`p-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${isLoading ? 'cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            <p className='my-4 font-semibold text-red-500'>Submit your blog and wait for its approval</p>
            </form>
            {(!existingBlog) && <Footer />}
            </>
    );
};

export default NewBlogForm;
