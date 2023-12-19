import { Tag } from 'antd';
import React from 'react';
import s from './ArticleTags.module.scss';

interface ArticleTagsProps {
  tagList: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tagList }) => {
  return (
    <div>
      {tagList.map((item, i) => (
        <Tag className={s.tag} key={`${item}${i}`}>
          {item}
        </Tag>
      ))}
    </div>
  );
};

export default ArticleTags;
