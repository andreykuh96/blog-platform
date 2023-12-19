import React from 'react';
import s from './EditArticlePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { ICreateArticleRequest } from '../../types/article.types';
import { IFormData } from '../../types/form.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditArticleMutation, useGetAnArticleQuery } from '../../store/blogApi';

const EditArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data } = useGetAnArticleQuery(slug ? slug : '');
  const [editArticle] = useEditArticleMutation();

  const getDataEditArticle = async (data: IFormData) => {
    const newArticle: ICreateArticleRequest = {
      article: {
        tagList: data?.tags?.map((item) => item.name),
        body: data.body,
        description: data.description,
        title: data.title,
      },
    };
    await editArticle({ slug: slug, body: newArticle });
    navigate(`/articles/${slug}`, { replace: true });
  };

  return (
    <div className={s.editArticle}>
      <MyForm
        defArticle={data?.article}
        addTags
        addText
        addShortDescr
        addTitle
        subText="Send"
        title="Edit article"
        getFormData={getDataEditArticle}
      />
    </div>
  );
};

export default EditArticlePage;
