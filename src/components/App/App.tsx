import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import ListPage from '../../pages/ListPage/ListPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserFromLS } from '../../store/reducers/userSlice/userSlice';
import NotAuthUser from '../HOK/NotAuthUser';
import AuthUser from '../HOK/AuthUser';
import CreateArticlePage from '../../pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage';

const App: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const userFromLS = localStorage.getItem('user');

    if (userFromLS) {
      const userParse = JSON.parse(userFromLS);
      dispatch(updateUserFromLS(userParse));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListPage />} />
        <Route path="articles" element={<ListPage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route element={<AuthUser user={user} />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route
          path="profile"
          element={
            <NotAuthUser user={user}>
              <ProfilePage />
            </NotAuthUser>
          }
        />
        <Route
          path="new-article"
          element={
            <NotAuthUser user={user}>
              <CreateArticlePage />
            </NotAuthUser>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <NotAuthUser user={user}>
              <EditArticlePage />
            </NotAuthUser>
          }
        />
        <Route path="*" element={<ListPage />} />
      </Route>
    </Routes>
  );
};

export default App;
