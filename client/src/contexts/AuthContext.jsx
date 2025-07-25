import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/verify`,
        {
          method: "GET",
          credentials: "include", 
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      setError("Authentication verification failed");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    checkAuthStatus();
  }, []); 

  
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok && data.accessToken) {
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; sameSite=strict`;
        const userWithType = {
          ...data.data.user,
          userType: credentials.userType,
        };

        setUser(userWithType);
        setIsAuthenticated(true);
        
        return { success: true, user: userWithType };
      } else {
        setError(data.message || "Login failed");
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Network error during login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.data.user };
      } else {
        setError(data.message || "Signup failed");
        return { success: false, error: data.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = "Network error during signup";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);

      // Notify backend about logout (this clears httpOnly cookies)
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear state regardless of backend response
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setLoading(false);
    }
  };

  // Refresh token function - for use by API interceptors
  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // Token refreshed successfully, user is still authenticated
        setIsAuthenticated(true);
        return true;
      } else {
        // Refresh failed, user needs to login again
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        signup,
        logout,
        refreshToken,
        checkAuthStatus,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
