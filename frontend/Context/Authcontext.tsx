'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export interface User {
  id: string;
  officephoneno: string;
  organizationName: string;
  department: string;
  desg: string;
  officeAddress: string;
  role: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (id: string) => void;
  logout: () => void;
  register: (id: string, officephoneno: string, organizationName: string, department: string, desg: string, officeAddress: string, role: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
    } else {
      setIsAuthenticated(false);
    }
  }, []);



  const register = async (id: string,
    officephoneno: string,
    organizationName: string,
    department: string,
    desg: string,
    officeAddress: string,
    role: string
) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, officephoneno, organizationName, department, desg, officeAddress, role }),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          text: 'You can now login with your credentials.',
        }).then(() => {
          router.push('/auth/login');
        });
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: 'An error occurred during registration.',
      });
    }
  };

  const login = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        credentials: 'include', // Allow sending cookies
      });
  
      if (res.ok) {
        const data = await res.json();
  
        if (typeof window !== "undefined") {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.user._id);
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
  
        setIsAuthenticated(true);
        setUser(data.user);
  
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
        }).then(() => {
          router.push(`/report/getorgReport/${data.user._id}`); // Redirect to the organization report page
        });
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'An error occurred during login.',
      });
    }
  };
  
  
  




  const logout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(undefined);
        Swal.fire({
          icon: 'success',
          title: 'Logout successful!',
        }).then(() => {
          router.push('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Logout failed',
          text: 'An error occurred during logout.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Logout failed',
        text: 'An error occurred during logout.',
      });
    }
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
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
