import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user?.roles?.includes('ROLE_ADMIN') || false;
  const isFaculty = user?.roles?.includes('ROLE_FACULTY') || false;
  const isStudent = user?.roles?.includes('ROLE_STUDENT') || false;

  return {
    user,
    isAuthenticated,
    loading,
    isAdmin,
    isFaculty,
    isStudent,
    logout: handleLogout,
  };
};
