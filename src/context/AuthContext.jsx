import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    } catch {
      localStorage.removeItem('currentUser');
    } finally {
      setLoading(false);
    }
  }, []);

  function login(email, password, role) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(
          u => u.email === email && u.password === password && u.role === role
        );

        if (validUser) {
          localStorage.setItem('currentUser', JSON.stringify(validUser));
          setUser(validUser);
          resolve(validUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 300);
    });
  }

  function register(name, email, selectedRole, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(u => u.email === email);

        if (emailExists) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = { email, password, name, role: selectedRole };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        resolve(newUser);
      }, 300);
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('currentUser');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
