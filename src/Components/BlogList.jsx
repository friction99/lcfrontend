import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backendURL}/api/blogspot/get`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          setBlogs(response.data);
        }
        setLoading(false);
      } catch (e) {
        setError('Error fetching blogs Refresh');
        setLoading(false);
      }
    }
    fetchData();
  }, [backendURL]);

  if (loading) return <LoadingSpinner />;
  if(error) return <p className='my-1 font-bold text-red-600'>{error}</p>
  const handleClick = (id) =>{
    navigate(`/blogdetails/${id}`)
  }
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <div className="relative h-[50vh] md:h-[85vh] w-full overflow-hidden rounded-lg">
          <img
            src="/blog_img.jpg"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="relative z-10 flex h-full items-center justify-center md:justify-end mt-12 md:mt-24 pr-4 md:pr-28">
            <h1 className="text-white text-lg md:text-2xl font-bold text-center md:text-right">
              <span>"Writing is the painting of the voice."</span>
              <span className="block mt-2">— Voltaire</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="text-center p-4 my-2 flex flex-col">
        <span className="text-xl md:text-2xl font-semibold">Our Blogs</span>
      </div>
      <div className="overflow-hidden">
        <div className="w-full my-2 mx-auto p-4 flex flex-col md:flex-row gap-10 md:gap-4 flex-wrap justify-center overflow-hidden">
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} onClick={() => handleClick(blog.id)} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );  
};

export default BlogList;
