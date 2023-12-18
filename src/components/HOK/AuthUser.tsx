import React from 'react';
import { IUser } from '../../types/user.types';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthUserProps {
  user: IUser | null;
}

const AuthUser: React.FC<AuthUserProps> = ({ user }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthUser;
