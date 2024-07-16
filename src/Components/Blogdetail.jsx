import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewBlogForm from "./NewBlogForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [admin, setAdmin] = useState(false);
  const user_id = useSelector((state) => state.blog.user_id);
  const author_id = useSelector((state) => state.auth.user_id);
  const admin_id = useSelector((state) => state.auth.admin_id);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (admin_id) setAdmin(true);
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/blog/all/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setBlogData(response.data);
      } catch (e) {
        setError(e.response.data.message || "Authentication failed Refresh");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, backendURL, admin_id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backendURL}/api/blog/all/${id}`);
      if (response.status === 204) {
        if (admin) {
          navigate('/adminpanel');
        } else {
          navigate('/blogs');
        }
      }
    } catch (error) {
      setError("Failed to delete the blog post. Please try again.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
            {error && <p className="text-red-400 text-base sm:text-lg leading-relaxed">{error}</p>}
            {(blogData.author === author_id || blogData.author === user_id || admin_id) && (
              <>
                <button className="p-2 my-2 bg-green-600 text-white rounded-md hover:bg-blue-600 transition duration-300 mr-4" onClick={handleEdit}>
                  Edit
                </button>
                <button className="p-2 my-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300" onClick={() => {
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
