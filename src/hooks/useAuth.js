import { useSelector } from 'react-redux';

const useAuth = () => {
  const { isAuthenticated, user, role, loading } = useSelector((state) => state.auth);
  
  const isStudent = role === 'student';
  const isFaculty = role === 'faculty';
  const isAdmin = role === 'admin';
  
  return {
    isAuthenticated,
    user,
    role,
    loading,
    isStudent,
    isFaculty,
    isAdmin,
  };
};

export default useAuth;
