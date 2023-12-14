import React from 'react';
import s from './ArticleHeader.module.scss';
import MyStatistic from '../UI/MyStatistic/MyStatistic';
import { Link } from 'react-router-dom';

interface ArticleHeaderProps {
  favoritesCount: number;
  title: string;
  slug: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ slug, title, favoritesCount }) => {
  return (
    <div className={s.header}>
      <Link to={`/articles/${slug}`} className={s.title}>
        {title}
      </Link>
      <MyStatistic favoritesCount={favoritesCount} />
    </div>
  );
};

export default ArticleHeader;
