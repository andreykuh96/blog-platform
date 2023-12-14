import { Tag } from 'antd';
import React from 'react';

interface ArticleTagsProps {
  tagList: string[];
}

const ArticleTags: React.FC<ArticleTagsProps> = ({ tagList }) => {
  return (
    <div>
      {tagList.map((item, i) => (
        <Tag key={`${item}${i}`}>{item}</Tag>
      ))}
    </div>
  );
};

export default ArticleTags;
