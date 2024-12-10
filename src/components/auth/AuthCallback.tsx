import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();

  useEffect(() => {
    if (user) {
      navigate('/create-profile');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#0f1629] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default AuthCallback;
