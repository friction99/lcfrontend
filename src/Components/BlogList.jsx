import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "./Footer";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backendUrl}/blogspot/get`);
        setBlogs(response.data); // Set the fetched blog data
        setLoading(false); 
      } catch (e) {
        setError("Error fetching blogs");
        setLoading(false);
      }
    }
    fetchData();
  }, [backendUrl]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return(
  <>
    <Navbar />
    <div className="pt-28">
      <div className="relative h-[85vh] w-full overflow-hidden rounded-lg">
          <img
            src="/blog_img.jpg"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="relative z-10 flex h-full items-center justify-end mt-24 mr-32 pr-28">
            <h1 className="text-black text-2xl font-bold">
              <span>"Writing is the painting of the voice."</span>
              <span className="block mt-2">— Voltaire</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="text-center p-4 my-6 flex flex-col">
        <span className="text-2xl font-semibold">Our Blogs</span>
      </div>
      <div className="overflow-hidden">
        <div className="w-full my-6 mx-auto p-4 flex flex-row gap-12 flex-wrap justify-center overflow-hidden">
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
  </>
  )
};

export default BlogList;
