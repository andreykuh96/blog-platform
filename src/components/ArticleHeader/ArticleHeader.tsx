import React from 'react';
import s from './ArticleHeader.module.scss';
import MyStatistic from '../UI/MyStatistic/MyStatistic';
import { Link } from 'react-router-dom';

interface ArticleHeaderProps {
  favoritesCount: number;
  title: string;
  slug: string;
  favorited: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ slug, title, favoritesCount, favorited }) => {
  return (
    <div className={s.header}>
      {slug.length > 1000 ? (
        <div style={{ color: 'red', textDecoration: 'line-through' }} className={s.title}>
          Статья недоступна
        </div>
      ) : (
        <Link to={`/articles/${slug}`} className={s.title}>
          {title}
        </Link>
      )}
      <MyStatistic favorited={favorited} slug={slug} favoritesCount={favoritesCount} />
    </div>
  );
};

export default ArticleHeader;
