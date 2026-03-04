import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-in-production';

// Simple JWT verification (in production, use a library like jsonwebtoken)
function verifyJWT(token: string): object | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {} as Record<string, string>);
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const cookies = parseCookies(event.headers.cookie);
    const sessionToken = cookies.session;

    if (!sessionToken) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No session found' }),
      };
    }

    const payload = verifyJWT(sessionToken);

    if (!payload) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid session' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user: payload,
      }),
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
