import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function hydrateUser() {
    setLoading(true);
    try {
      // Prefer your existing "me" or "verify" endpoint
      let res = await api("/api/users/verify");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || data.data?.user || data.data || null);
      } else if (res.status === 401) {
        const r = await api("/api/users/refresh", { method: "POST" });
        if (r.ok) {
          res = await api("/api/users/verify");
          if (res.ok) {
            const data = await res.json();
            setUser(data.user || data.data?.user || data.data || null);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    hydrateUser();
  }, []);

  useEffect(() => {
    function onExpired() {
      setUser(null);
      try {
        localStorage.removeItem("userType");
      } catch {}
      navigate("/login", { replace: true, state: { reason: "expired" } });
    }
    window.addEventListener("session-expired", onExpired);
    return () => window.removeEventListener("session-expired", onExpired);
  }, [navigate]);

  async function login(credentials) {
    const res = await api("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setUser(data.user || data.data?.user || data.data || null);
  }

  async function logout() {
    await api("/api/users/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user, // add this
        login,
        logout,
        refresh: hydrateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
