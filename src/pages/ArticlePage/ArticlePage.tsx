import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAnArticle } from '../../store/reducers/articleSlice/articleThunk';
import s from './ArticlePage.module.scss';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleTags from '../../components/ArticleTags/ArticleTags';
import ArticleDescr from '../../components/ArticleDescr/ArticleDescr';
import User from '../../components/User/User';
import ReactMarkdown from 'react-markdown';
import { Result, Spin } from 'antd';

const ArticlePage: React.FC = () => {
  const { article, loading, error } = useAppSelector((state) => state.articleSlice);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  React.useEffect(() => {
    if (slug) {
      dispatch(getAnArticle(slug));
    }
  }, [dispatch, slug]);

  return (
    <>
      {article && (
        <div className={s.article}>
          {error ? <Result status="warning" title={error} /> : null}
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <div className={s.header}>
                <div className={s.body}>
                  <ArticleHeader favoritesCount={article.favoritesCount} title={article.title} slug={article.slug} />
                  <ArticleTags tagList={article.tagList} />
                  <ArticleDescr description={article.description} />
                </div>
                <User username={article.author.username} createdAt={article.createdAt} image={article.author.image} />
              </div>
              <ReactMarkdown className={s.markdown}>{article.body}</ReactMarkdown>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ArticlePage;
