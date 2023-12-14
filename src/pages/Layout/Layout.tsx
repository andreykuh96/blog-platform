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
          <MyButton type="text">Sign In</MyButton>
          <MyButton type="default">Sign Up</MyButton>
        </div>
      </div>
      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
