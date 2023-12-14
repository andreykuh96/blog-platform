import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import ListPage from '../../pages/ListPage/ListPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListPage />} />
        <Route path="articles" element={<ListPage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
