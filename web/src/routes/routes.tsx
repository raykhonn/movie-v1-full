import React from 'react';
import { Navigate, Route, Routes as Switch, useNavigate } from 'react-router-dom';
import { Auth, Movies } from 'pages';
import { Navbar } from 'components';

const Routes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="movies">
          <Route index element={<Movies.Main />} />
          <Route path=":movieId" element={<Movies.Single navigate={navigate} />} />
          <Route path="*" element={<Navigate to="/movies" />} />
        </Route>

        <Route path="auth">
          <Route path="login" element={<Auth.Login />} />
          <Route path="register" element={<Auth.Register />} />
          <Route index path="*" element={<Navigate to="/auth/login" />} />
        </Route>

        <Route path="*" element={<Navigate to="/movies" />} />
      </Switch>
    </>
  );
};

export default Routes;
