import React from 'react';
import s from './CreateArticlePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { useAppDispatch } from '../../store/hooks';
import { createAnArticle } from '../../store/reducers/articleSlice/articleThunk';
import { IFormData } from '../../types/form.types';
import { ICreateArticleRequest } from '../../types/article.types';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDataNewArticle = (data: IFormData) => {
    const newArticle: ICreateArticleRequest = {
      article: {
        tagList: data?.tags?.map((item) => item.name),
        body: data.body,
        description: data.description,
        title: data.title,
      },
    };
    dispatch(createAnArticle(newArticle));
    navigate('/', { replace: true });
  };

  return (
    <div className={s.createArticle}>
      <MyForm
        addTags
        addText
        addShortDescr
        addTitle
        subText="Send"
        title="Create new article"
        getFormData={getDataNewArticle}
      />
    </div>
  );
};

export default CreateArticlePage;
