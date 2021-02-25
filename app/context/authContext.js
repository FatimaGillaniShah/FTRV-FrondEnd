import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const initData = JSON.parse(localStorage.getItem('user')) || {
    isAuthenticated: false,
    token: null,
    data: {},
  };
  const [user, setUser] = useState(initData);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
