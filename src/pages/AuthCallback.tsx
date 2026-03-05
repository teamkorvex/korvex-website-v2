import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = sessionStorage.getItem('oauth_state');

      // CSRF protection
      if (!state || state !== storedState) {
        setError('Invalid authentication state.');
        return;
      }

      if (!code) {
        setError('No authorization code received.');
        return;
      }

      try {
        // Exchange OAuth code via Vercel serverless function
        const response = await fetch('/api/auth-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Authentication failed');
        }

        // Clean state storage
        sessionStorage.removeItem('oauth_state');

        // Redirect to dashboard after successful verification
        navigate('/dashboard', { replace: true });

      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Authentication failed'
        );
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="font-semibold text-2xl text-primary-light mb-4">
            Authentication Failed
          </h1>

          <p className="text-secondary-light mb-6">{error}</p>

          <button
            onClick={() => navigate('/')}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-3 rounded-lg transition hover:-translate-y-0.5"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-2 border-cobalt border-t-transparent rounded-full mx-auto mb-4" />

        <p className="text-secondary-light">
          Completing authentication...
        </p>
      </div>
    </div>
  );
}
