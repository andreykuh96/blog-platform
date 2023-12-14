import React from 'react';
import s from './Layout.module.scss';
import { Link, Outlet } from 'react-router-dom';
import MyButton from '../../components/UI/MyButton/MyButton';

const Layout: React.FC = () => {
  return (
    <div className={s.layout}>
      <div className={s.header}>
        <Link to="/articles">
          <MyButton type="text">Realworld Blog</MyButton>
        </Link>
        <div className={s.btns}>
          <Link to="/sign-in">
            <MyButton type="text">Sign In</MyButton>
          </Link>
          <Link to="/sign-up">
            <MyButton type="default">Sign Up</MyButton>
          </Link>
        </div>
      </div>
      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
