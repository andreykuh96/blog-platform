import React from 'react';
import s from './EditArticlePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateAnArticle } from '../../store/reducers/articleSlice/articleThunk';
import { ICreateArticleRequest } from '../../types/article.types';
import { IFormData } from '../../types/form.types';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticlePage: React.FC = () => {
  const article = useAppSelector((state) => state.articleSlice.article);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const getDataEditArticle = (data: IFormData) => {
    const newArticle: ICreateArticleRequest = {
      article: {
        tagList: data?.tags?.map((item) => item.name),
        body: data.body,
        description: data.description,
        title: data.title,
      },
    };
    if (slug) {
      dispatch(updateAnArticle({ slug: slug, body: newArticle }));
    }

    navigate(`/articles/${slug}`, { replace: true });
  };

  return (
    <div className={s.editArticle}>
      <MyForm
        defArticle={article}
        addTags
        addText
        addShortDescr
        addTitle
        subText="Send"
        title="Create new article"
        getFormData={getDataEditArticle}
      />
    </div>
  );
};

export default EditArticlePage;
