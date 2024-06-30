import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem"; // Make sure you have a BlogItem component to render individual blogs
import LoadingSpinner from "./LoadingSpinner"; // Make sure you have a LoadingSpinner component
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${backendUrl}/blogspot/pending`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setBlogs(response.data); // Set the fetched blog data
        setLoading(false); 
      } catch (e) {
        setError("Error fetching blogs");
        setLoading(false);
      }
    }
    fetchData();
  }, [backendUrl, token]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/blogspot/approve/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.status === 200) {
        setBlogs(blogs.filter(blog => blog.id !== id));
      }
    } catch (e) {
      setError("Error approving blog");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="pt-28">
        <div className="text-center p-4 my-6 flex flex-col">
          <span className="text-2xl font-semibold">Pending Blog Approvals</span>
        </div>
        <div className="overflow-hidden">
          <div className="w-full my-6 mx-auto p-4 flex flex-row gap-12 flex-wrap justify-center overflow-hidden">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col items-center">
                <BlogItem blog={blog} />
                <button
                  className="p-2 m-2 bg-green-500 rounded text-white"
                  onClick={() => handleApprove(blog.id)}
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
