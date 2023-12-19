import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import s from './ArticlePage.module.scss';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleTags from '../../components/ArticleTags/ArticleTags';
import ArticleDescr from '../../components/ArticleDescr/ArticleDescr';
import User from '../../components/User/User';
import ReactMarkdown from 'react-markdown';
import { Result, Spin } from 'antd';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useDeleteArticleMutation, useGetAnArticleQuery } from '../../store/blogApi';

const ArticlePage: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, isError, isLoading, error } = useGetAnArticleQuery(slug ? slug : '');
  const [deleteArticle] = useDeleteArticleMutation();

  const onDeleteArticle = async () => {
    await deleteArticle(slug);
    navigate('/', { replace: true });
  };

  return (
    <>
      {data?.article && (
        <div className={s.article}>
          {isError ? <Result status="warning" title={JSON.stringify(error)} /> : null}
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
              <div className={s.header}>
                <div className={s.body}>
                  <ArticleHeader
                    favorited={data.article.favorited}
                    favoritesCount={data.article.favoritesCount}
                    title={data.article.title}
                    slug={data.article.slug}
                  />
                  <ArticleTags tagList={data.article.tagList} />
                  <ArticleDescr description={data.article.description} />
                </div>
                {user?.username === data.article.author.username ? (
                  <div className={s.authUser}>
                    <User
                      username={data.article.author.username}
                      createdAt={data.article.createdAt}
                      image={data.article.author.image}
                    />
                    <div className={s.btns}>
                      <MyButton onClick={onDeleteArticle} color="#F5222D" type="default">
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
                  <User
                    username={data.article.author.username}
                    createdAt={data.article.createdAt}
                    image={data.article.author.image}
                  />
                )}
              </div>
              <ReactMarkdown className={s.markdown}>{data.article.body}</ReactMarkdown>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ArticlePage;
