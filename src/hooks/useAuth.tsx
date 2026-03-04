import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { DiscordUser, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DISCORD_CLIENT_ID = '1478785957569233028';
const REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}/auth/callback`
  : 'http://localhost:5173/auth/callback';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const response = await fetch('/.netlify/functions/auth-check', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(() => {
    const state = crypto.randomUUID();
    sessionStorage.setItem('oauth_state', state);
    
    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'identify guilds',
      state: state,
    });
    
    window.location.href = `https://discord.com/oauth2/authorize?${params.toString()}`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/.netlify/functions/auth-logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
