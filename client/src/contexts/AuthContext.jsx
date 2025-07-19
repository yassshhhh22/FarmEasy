import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Token validation function
  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  // Token refresh function
  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include httpOnly refresh token cookie
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  useEffect(() => {
    // Check for existing session with backend on app start
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {
            method: "GET",
            credentials: "include", // Include httpOnly cookies
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setToken(userData.accessToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Auto token refresh
  useEffect(() => {
    if (!token || !isAuthenticated) return;

    const checkTokenExpiry = () => {
      if (!isTokenValid(token)) {
        refreshToken().then((success) => {
          if (!success) {
            logout();
          }
        });
      }
    };

    // Check token every 5 minutes
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, isAuthenticated]);

  const login = (userData, authToken) => {
    if (!userData.role) {
      throw new Error("User data must include a role property.");
    }

    if (!isTokenValid(authToken)) {
      throw new Error("Invalid or expired token.");
    }

    // Update state with access token
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Notify backend about logout
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear state
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  // Get current valid token
  const getToken = async () => {
    if (!token) return null;

    if (isTokenValid(token)) {
      return token;
    }

    // Try to refresh if expired
    const refreshed = await refreshToken();
    return refreshed ? token : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        token,
        login,
        logout,
        getToken,
        refreshToken,
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
