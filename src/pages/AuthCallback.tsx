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

      // Verify state to prevent CSRF
      if (state !== storedState) {
        setError('Invalid state parameter. Please try again.');
        return;
      }

      if (!code) {
        setError('No authorization code received.');
        return;
      }

      try {
        // Exchange code for token via Netlify Function
        const response = await fetch('/.netlify/functions/auth-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Authentication failed');
        }

        // Clear state
        sessionStorage.removeItem('oauth_state');

        // Redirect to dashboard
window.location.href =
  'https://discord.com/oauth2/authorize?client_id=1478785957569233028&response_type=code&redirect_uri=https%3A%2F%2Fwww.korvex.xyz%2Fdashboard&scope=identify+connections+guilds.members.read+presences.read+email';
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
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
          <h1 className="font-heading font-semibold text-2xl text-primary-light mb-4">
            Authentication Failed
          </h1>
          <p className="text-secondary-light mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
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
        <div className="animate-pulse-soft">
          <div className="w-12 h-12 border-2 border-cobalt border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        </div>
        <p className="text-secondary-light">Completing authentication...</p>
      </div>
    </div>
  );
}
