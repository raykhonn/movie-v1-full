import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { IEntity } from 'modules/auth/types';

interface NavbarProps {
  user?: Partial<IEntity.User>;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-300 py-4">
      <div className="container mx-auto flex items-center gap-10">
        <Typography className="cursor-pointer font-aeonik text-3xl font-bold" onClick={() => navigate('/')}>
          Movies
        </Typography>

        {user ? (
          <div className="flex items-center gap-4 text-[30px]">
            <div className="text-xl">
              <Typography className="text-[20px]">{user.name}</Typography>
            </div>
            <div className="text-xl">
              <button className="text-[20px] text-stone-600 hover:text-stone-800">Logout</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 justify-between">
            <div className="flex gap-4 text-[30px]">
              <div className="text-xl">
                <NavLink to="/auth/login" className={({ isActive }) => `${isActive ? 'text-stone-900' : ''} text-stone-600 no-underline hover:text-stone-900`}>
                  Login
                </NavLink>
              </div>
              <div className="text-xl">
                <NavLink
                  to="/auth/register"
                  className={({ isActive }) => `${isActive ? 'text-stone-900' : ''} text-stone-600 no-underline hover:text-stone-900`}
                >
                  Register
                </NavLink>
              </div>
            </div>
            <Button onClick={() => navigate('/movies/add')}>Add Movie</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
