import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../pages/Layout/Layout';
import ListPage from '../../pages/ListPage/ListPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListPage />} />
        <Route path="articles" element={<ListPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
};

export default App;
