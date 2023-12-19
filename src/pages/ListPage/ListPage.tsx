import React from 'react';
import s from './ListPage.module.scss';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import MyPagination from '../../components/UI/MyPagination/MyPagination';
import { Result, Spin } from 'antd';
import { useGetAllArticlesQuery } from '../../store/blogApi';

const ListPage: React.FC = () => {
  const [currentPage, setcurrentPage] = React.useState(1);
  const { data, isLoading, isError, error } = useGetAllArticlesQuery(currentPage * 5 - 5);

  const onChangeCurrentPage = (page: number): void => {
    setcurrentPage(page);
  };

  return (
    <div className={s.listPage}>
      {isError ? <Result status="warning" title={`${JSON.stringify(error)}`} /> : null}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={s.list}>
            {data?.articles.map((item) => (
              <ArticleCard {...item} key={item.slug} />
            ))}
          </div>
          <MyPagination
            onChange={onChangeCurrentPage}
            current={currentPage}
            total={data?.articlesCount}
            pageSize={5}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

export default ListPage;
