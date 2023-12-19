import React from 'react';
import s from './CreateArticlePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';
import { ICreateArticleRequest } from '../../types/article.types';
import { useCreateArticleMutation } from '../../store/blogApi';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage: React.FC = () => {
  const [createArticle] = useCreateArticleMutation();
  const navigate = useNavigate();

  const getDataNewArticle = async (data: IFormData) => {
    const newArticle: ICreateArticleRequest = {
      article: {
        tagList: data?.tags?.map((item) => item.name),
        body: data.body,
        description: data.description,
        title: data.title,
      },
    };
    createArticle(newArticle);
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
