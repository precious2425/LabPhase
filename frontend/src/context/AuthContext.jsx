import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shopsphere_user') || 'null'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('shopsphere_token');
    if (!token) { setLoading(false); return; }
    api.get('/auth/me')
      .then(({ data }) => setUser(data.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  function saveSession(data) {
    localStorage.setItem('shopsphere_token', data.token);
    localStorage.setItem('shopsphere_user', JSON.stringify(data.user));
    setUser(data.user);
  }
  function logout() {
    localStorage.removeItem('shopsphere_token');
    localStorage.removeItem('shopsphere_user');
    setUser(null);
  }

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    saveSession(data);
  }
  async function register(name, email, password) {
    const { data } = await api.post('/auth/register', { name, email, password });
    saveSession(data);
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
