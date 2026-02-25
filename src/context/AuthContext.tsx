'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getAvatarUrl } from '@/utils/avatarUtils';

type UserRole = 'landlord' | 'tenant' | null;

interface AuthContextType {
  role: UserRole;
  userName: string | null;
  login: (data: { role: UserRole; name?: string; profileImage?: string }) => void;
  logout: () => void;
  profileImage: string | null; // This will return the actual uploaded image or null
  displayImage: string; // This will return the uploaded image OR the dynamic fallback
  updateProfileImage: (url: string) => void;
  updateUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for persistent mock session
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
    
    // Check local storage for user name
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }

    // Check local storage for profile image
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const login = ({ role: newRole, name, profileImage: newImage }: { role: UserRole; name?: string; profileImage?: string }) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('userRole', newRole);
      
      if (name) {
        setUserName(name);
        localStorage.setItem('userName', name);
      } else {
        setUserName(null);
        localStorage.removeItem('userName');
      }

      if (newImage) {
        setProfileImage(newImage);
        localStorage.setItem('profileImage', newImage);
      } else {
        setProfileImage(null);
        localStorage.removeItem('profileImage');
      }

      router.push(newRole === 'landlord' ? '/landlord' : '/tenant');
    }
  };

  const logout = () => {
    setRole(null);
    setUserName(null);
    setProfileImage(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileImage');
    // Force a full page reload to clear any remaining state
    window.location.href = '/';
  };

  const updateProfileImage = (url: string) => {
    setProfileImage(url);
    localStorage.setItem('profileImage', url);
  };

  const updateUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const displayImage = profileImage || getAvatarUrl(userName);

  return (
    <AuthContext.Provider value={{ role, userName, login, logout, profileImage, displayImage, updateProfileImage, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
