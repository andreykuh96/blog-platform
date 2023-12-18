import React from 'react';
import s from './Layout.module.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import User from '../../components/User/User';
import { removeUserFromLS } from '../../store/reducers/userSlice/userSlice';

const Layout: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(removeUserFromLS(null));
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={s.layout}>
      <div className={s.header}>
        <Link to="/articles">
          <MyButton type="text">Realworld Blog</MyButton>
        </Link>
        <div className={s.btns}>
          {!user ? (
            <>
              <Link to="/sign-in">
                <MyButton type="text">Sign In</MyButton>
              </Link>
              <Link to="/sign-up">
                <MyButton color="#52C41A" type="default">
                  Sign Up
                </MyButton>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <MyButton color="#52C41A" type="default">
                  Create article
                </MyButton>
              </Link>
              <Link to="/profile">
                <User username={user.username} image={user.image} />
              </Link>
              <MyButton onClick={logOut} size="large" color="#000" type="default">
                Log Out
              </MyButton>
            </>
          )}
        </div>
      </div>
      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
