import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import NewBlogForm from "./NewBlogForm";
import { useNavigate } from "react-router-dom";
const BlogDetail = () => {
  const { id } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = useSelector((state) => state.auth.token);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const user_id = useSelector((state) => state.blog.user_id);
  const author_id = useSelector((state) => state.auth.user_id);
  const admin_token = useSelector((state) => state.auth.admin_token);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/blog/all/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogData(response.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, backendUrl, token]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };
  const handleDelete = async()=>{
    const response = await axios.delete(`${backendUrl}/blog/all/${id}`)
    if (response.status === 204){
      navigate('/blogspot');
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-500 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-8">
        {editMode ? (
          <>
            <NewBlogForm existingBlog={blogData} />
            <button
              className="p-2 mt-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">{blogData.title}</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{blogData.content}</p>
            {(blogData.author === author_id || blogData.author === user_id || admin_token) && (
              <>
                <button className="p-2 my-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 mr-4" onClick={handleEdit}>
                  Edit
                </button>
                <button className="p-2 my-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300" onClick={() => {
                  if (window.confirm("Are you sure you want to delete this item?")) {
                    handleDelete();
                  }
                }}>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
