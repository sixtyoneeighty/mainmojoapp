import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const errorDescription = params.get('error_description');

      if (errorDescription) {
        console.error('Auth error:', errorDescription);
        navigate('/login?error_description=' + encodeURIComponent(errorDescription));
        return;
      }

      // If we have a user, they're authenticated
      if (user) {
        // Check if they have a profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Redirect based on whether they have a profile
        navigate(profile ? '/upload' : '/create-profile');
      }
    };

    handleCallback();
  }, [user, navigate, supabase]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1629] flex items-center justify-center px-4">
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1629] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default AuthCallback;
