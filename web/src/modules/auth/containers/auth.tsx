import React from 'react';
import { AuthContext } from '../context';
import { IEntity } from '../types';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [state, setState] = React.useState({ user: null, isLoading: false, isAuthenticated: false });

  const login = (user: IEntity.User) => {};

  const logout = () => {};

  return <AuthContext.Provider value={{ ...state, methods: { logout, login } }}>{children}</AuthContext.Provider>;
};

export default Auth;
