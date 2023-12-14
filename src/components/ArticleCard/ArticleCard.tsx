import React from 'react';
import s from './ArticleCard.module.scss';
import { IArticle } from '../../types/article.types';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleTags from '../ArticleTags/ArticleTags';
import ArticleDescr from '../ArticleDescr/ArticleDescr';
import User from '../User/User';

const ArticleCard: React.FC<IArticle> = ({ author, createdAt, description, favoritesCount, tagList, title, slug }) => {
  return (
    <div className={s.item}>
      <div className={s.body}>
        <ArticleHeader favoritesCount={favoritesCount} title={title} slug={slug} />
        <ArticleTags tagList={tagList} />
        <ArticleDescr description={description} />
      </div>
      <User username={author.username} createdAt={createdAt} image={author.image} />
    </div>
  );
};

export default ArticleCard;
