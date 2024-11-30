import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string> => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      // Check for specific error response from the server
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Invalid credentials');
    }

    const data = await response.json();

    // TODO: return the JWT token from the response
    if (!data.token) {
      throw new Error('Token not found in the response');
    }

    return data.token; // Return the token for authentication
  } catch (error: any) {
    console.error('Login failed:', error.message || error);
    throw error;
  }
};

export { login };

