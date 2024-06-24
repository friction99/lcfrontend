import React, { useRef } from 'react';
import axios from 'axios';

const NewBlogForm = () => {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            title:titleRef.current.value,
            content:contentRef.current.value
        }   
        try{
            const response = await axios.post(`${backendUrl}/blogspot/post`,data,
                {
                    headers:{
                        'Content-Type':'application/json',
                    }
                }
            )
            console.log(response);
        }catch(e){
            console.error('There was an error!', e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 w-full max-w-lg mx-auto">
            <label htmlFor="title" className="text-lg font-semibold mb-2">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title of your Blog"
                ref={titleRef}
                className="p-2 mb-4 border rounded-lg"
                required
            />
            
            <label htmlFor="content" className="text-lg font-semibold mb-2">Content:</label>
            <textarea
                id="content"
                name="content"
                placeholder="Enter content of your Blog"
                ref={contentRef}
                className="p-2 mb-4 border rounded-lg h-32"
                required
            />
            
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default NewBlogForm;
