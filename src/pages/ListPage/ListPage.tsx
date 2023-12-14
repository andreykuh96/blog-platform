import React from 'react';
import s from './ListPage.module.scss';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import MyPagination from '../../components/UI/MyPagination/MyPagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllArticles } from '../../store/reducers/articleSlice/articleThunk';
import { Result, Spin } from 'antd';
import { changeCurrentPage } from '../../store/reducers/articleSlice/articleSlice';

const ListPage: React.FC = () => {
  const { articles, loading, error, articlesCount, currentPage } = useAppSelector((state) => state.articleSlice);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllArticles(currentPage * 5 - 5));
  }, [dispatch, currentPage]);

  const onChangeCurrentPage = (page: number): void => {
    dispatch(changeCurrentPage(page));
  };

  return (
    <div className={s.listPage}>
      {error ? <Result status="warning" title={error} /> : null}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={s.list}>
            {articles.map((item) => (
              <ArticleCard {...item} key={item.slug} />
            ))}
          </div>
          <MyPagination
            onChange={onChangeCurrentPage}
            current={currentPage}
            total={articlesCount}
            pageSize={5}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

export default ListPage;
