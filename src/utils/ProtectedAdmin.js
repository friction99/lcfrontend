import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { clearBlogState } from './blogSlice';
const ProtectedAdmin = ({ children }) => {
    const token = useSelector((state) => state.auth.admin_token);
    const dispatch = useDispatch();
    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            dispatch(clearBlogState());
            return <Navigate to="/admin/login" />;
        }
    } catch (e) {
        dispatch(clearBlogState());
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedAdmin;
