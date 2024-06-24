import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import LoadingSpinner from "./LoadingSpinner"; // Assume you have a LoadingSpinner component
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
        setLoading(false); // Stop loading spinner
      } catch (e) {
        setError("Error fetching blogs");
        setLoading(false);
      }
    }
    fetchData();
  }, [backendUrl]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return <>
      <Navbar/>
      <div className="text-center pt-32 p-4">
          <span className="text-3xl font-bold">Our Blogs</span>
      </div>
      <div className="h-[85vh]">
        <div className="w-full my-12 mx-4 p-4 flex flex-row gap-12 flex-wrap justify-center">
            {blogs.map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
        </div>
      </div>
      <Footer/>
  </>
};

export default BlogList;
