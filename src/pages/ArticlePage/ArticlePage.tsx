import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteAnArticle, getAnArticle } from '../../store/reducers/articleSlice/articleThunk';
import s from './ArticlePage.module.scss';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleTags from '../../components/ArticleTags/ArticleTags';
import ArticleDescr from '../../components/ArticleDescr/ArticleDescr';
import User from '../../components/User/User';
import ReactMarkdown from 'react-markdown';
import { Result, Spin } from 'antd';
import MyButton from '../../components/UI/MyButton/MyButton';

const ArticlePage: React.FC = () => {
  const { article, loading, error } = useAppSelector((state) => state.articleSlice);
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  React.useEffect(() => {
    if (slug) {
      dispatch(getAnArticle(slug));
    }
  }, [dispatch, slug]);

  const deleteArticle = () => {
    if (slug) {
      dispatch(deleteAnArticle(slug));
      navigate('/', { replace: true });
    }
  };

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
                  <ArticleHeader
                    favorited={article.favorited}
                    favoritesCount={article.favoritesCount}
                    title={article.title}
                    slug={article.slug}
                  />
                  <ArticleTags tagList={article.tagList} />
                  <ArticleDescr description={article.description} />
                </div>
                {user?.username === article.author.username ? (
                  <div className={s.authUser}>
                    <User
                      username={article.author.username}
                      createdAt={article.createdAt}
                      image={article.author.image}
                    />
                    <div className={s.btns}>
                      <MyButton onClick={deleteArticle} color="#F5222D" type="default">
                        delete
                      </MyButton>
                      <Link to={`/articles/${slug}/edit`}>
                        <MyButton color="#52C41A" type="default">
                          Edit
                        </MyButton>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <User username={article.author.username} createdAt={article.createdAt} image={article.author.image} />
                )}
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
