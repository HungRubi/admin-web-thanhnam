import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { currentUser, isAuthenticated, initialized, loading } = useSelector(state => state.user);

    if (!initialized || loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-600">
                Đang tải...
            </div>
        );
    }

    if (!isAuthenticated || !currentUser) {
        return <Navigate to={"/login"} replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;