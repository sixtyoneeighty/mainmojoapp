import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useSupabase } from '../../contexts/SupabaseContext';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();

  useEffect(() => {
    if (user) {
      navigate('/upload');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#0f1629] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-[#1a2137] p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Access your medical image analysis dashboard
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4F46E5',
                  brandAccent: '#4338CA',
                  brandButtonText: 'white',
                  defaultButtonBackground: '#2d3748',
                  defaultButtonBackgroundHover: '#4a5568',
                  defaultButtonBorder: '#4a5568',
                  defaultButtonText: 'white',
                  dividerBackground: '#4a5568',
                  inputBackground: '#2d3748',
                  inputBorder: '#4a5568',
                  inputBorderHover: '#6b7280',
                  inputBorderFocus: '#4F46E5',
                  inputText: 'white',
                  inputPlaceholder: '#9CA3AF',
                }
              }
            },
            style: {
              button: {
                borderRadius: '6px',
                height: '40px',
                fontSize: '14px',
                fontWeight: '500',
              },
              container: {
                color: '#E5E7EB',
              },
              divider: {
                margin: '1.5rem 0',
              },
              label: {
                color: '#E5E7EB',
                fontSize: '14px',
                marginBottom: '4px',
              },
              input: {
                borderRadius: '6px',
                fontSize: '14px',
              },
              message: {
                color: '#EF4444',
                fontSize: '14px',
                marginTop: '4px',
              },
            },
          }}
          providers={['google', 'facebook']}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders
        />
      </div>
    </div>
  );
};

export default Login;
