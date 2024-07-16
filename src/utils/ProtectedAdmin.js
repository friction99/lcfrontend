import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedAdmin = ({ children }) => {
    const token = useSelector((state) => state.auth.admin_id);
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    return children;
};

export default ProtectedAdmin;
