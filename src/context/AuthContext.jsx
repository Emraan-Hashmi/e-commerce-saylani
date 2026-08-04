import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/initialData';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('saylani_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('saylani_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('saylani_jwt_token') || null;
  });

  // Sync users list to localStorage
  useEffect(() => {
    localStorage.setItem('saylani_users', JSON.stringify(users));
  }, [users]);

  // Sync current user and token to localStorage
  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('saylani_current_user', JSON.stringify(currentUser));
      localStorage.setItem('saylani_jwt_token', token);
    } else {
      localStorage.removeItem('saylani_current_user');
      localStorage.removeItem('saylani_jwt_token');
    }
  }, [currentUser, token]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      addToast('Invalid email or password', 'error');
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate mock JWT token
    const mockToken = `header.${btoa(JSON.stringify({ id: foundUser.id, role: foundUser.role }))}.signature`;
    
    setCurrentUser(foundUser);
    setToken(mockToken);
    addToast(`Welcome back, ${foundUser.name}!`, 'success');
    return { success: true, user: foundUser, token: mockToken };
  };

  const register = (name, email, password, role = 'customer') => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      addToast('An account with this email already exists', 'error');
      return { success: false, message: 'Email already exists' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto-login registered user
    const mockToken = `header.${btoa(JSON.stringify({ id: newUser.id, role: newUser.role }))}.signature`;
    setCurrentUser(newUser);
    setToken(mockToken);

    addToast(`Account created successfully! Welcome ${newUser.name}`, 'success');
    return { success: true, user: newUser, token: mockToken };
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    addToast('You have been logged out', 'info');
  };

  const updateUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    // If updating current user's role
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    addToast('User role updated successfully', 'success');
  };

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addToast('User deleted successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        token,
        login,
        register,
        logout,
        updateUserRole,
        deleteUser,
        isAdmin: currentUser?.role === 'admin',
        isCustomer: currentUser?.role === 'customer',
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
