import React from 'react';

interface ArticleDescrProps {
  description: string;
}

const ArticleDescr: React.FC<ArticleDescrProps> = ({ description }) => {
  return <div>{description}</div>;
};

export default ArticleDescr;
