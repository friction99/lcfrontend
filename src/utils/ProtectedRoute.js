import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { clearAuthState } from './authSlice';
const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    if (!token) {
        return <Navigate to="/blog" />;
    }
    try{
        const {exp} = jwtDecode(token);
        if (Date.now() >= exp * 1000){
            dispatch(clearAuthState());
            return <Navigate to="/" />;
        }
    }catch(e){
        dispatch(clearAuthState());
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
