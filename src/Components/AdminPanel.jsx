import { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem"; 
import LoadingSpinner from "./LoadingSpinner"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../utils/authSlice";
const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = useSelector((state) => state.auth.admin_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      console.log(token);
      try {
        const response = await axios.get(`${backendUrl}/blogspot/pending`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        if(response.status === 200){
            setBlogs(response.data);
        }
        setLoading(false); 
      } catch (e) {
        console.log(e);
        setError("Error fetching blogs");
        setLoading(false);
      }
    }
    fetchData();
  }, [backendUrl, token]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/blogspot/approve/${id}`, {},{
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
  const handleClick = (id) =>{
    navigate(`/blogdetails/${id}`)
  }
  const handleLogout = () => {
    dispatch(clearAuthState());
    navigate("/");
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="pt-28">
        <div className="text-center p-4 my-6 flex flex-col">
          <span className="text-2xl font-semibold">Pending Blog Approvals</span>
        </div>
        <div className="overflow-hidden">
          <div className="w-full my-6 mx-auto p-4 flex flex-col sm:flex-row gap-6 sm:gap-12 flex-wrap justify-center overflow-hidden">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col items-center mb-4 sm:mb-0">
                <BlogItem blog={blog} onClick={() => handleClick(blog.id)} />
                <button
                  className="p-2 m-2 bg-green-500 rounded text-white hover:bg-green-600"
                  onClick={() => handleApprove(blog.id)}
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="mt-6 bg-red-500 text-white p-2 m-4 rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
