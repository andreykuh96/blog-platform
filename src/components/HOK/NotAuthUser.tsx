import React from 'react';
import { Navigate } from 'react-router-dom';
import { IUser } from '../../types/user.types';

interface NotAuthUserProps {
  children: React.ReactElement;
  user: IUser | null;
}

const NotAuthUser: React.FC<NotAuthUserProps> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default NotAuthUser;
