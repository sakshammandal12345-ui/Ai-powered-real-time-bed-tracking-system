import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('bt_user');
      const storedRole = localStorage.getItem('bt_role');
      const storedToken = localStorage.getItem('bt_token');

      if (storedUser && storedRole && storedToken) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      }
    } catch {
      localStorage.removeItem('bt_user');
      localStorage.removeItem('bt_role');
      localStorage.removeItem('bt_token');
    } finally {
      setLoading(false);
    }
  }, []);

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          let assignedRole = 'Admin';
          if (email.includes('nurse')) assignedRole = 'Nurse';
          else if (email.includes('billing')) assignedRole = 'Billing';
          else if (email.includes('viewer')) assignedRole = 'Viewer';

          const mockUser = { id: '1', name: 'Dr. Smith', email };
          setUser(mockUser);
          setRole(assignedRole);
          localStorage.setItem('bt_user', JSON.stringify(mockUser));
          localStorage.setItem('bt_role', assignedRole);
          localStorage.setItem('bt_token', 'mock-jwt-token-123');
          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 600);
    });
  }

  function register(name, email, selectedRole, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error('Missing fields'));
          return;
        }
        const mockUser = { id: Date.now().toString(), name, email };
        setUser(mockUser);
        setRole(selectedRole);
        localStorage.setItem('bt_user', JSON.stringify(mockUser));
        localStorage.setItem('bt_role', selectedRole);
        localStorage.setItem('bt_token', 'mock-jwt-token-123');
        resolve(mockUser);
      }, 600);
    });
  }

  function logout() {
    setUser(null);
    setRole(null);
    localStorage.removeItem('bt_user');
    localStorage.removeItem('bt_role');
    localStorage.removeItem('bt_token');
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
    <AuthContext.Provider value={{ user, role, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
