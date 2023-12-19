import React from 'react';

interface ArticleDescrProps {
  description: string;
}

const ArticleDescr: React.FC<ArticleDescrProps> = ({ description }) => {
  const formatLongString = (str: string): string => {
    if (!str) return '';
    if (str.length > 230) {
      return str.slice(0, 230) + '...';
    } else {
      return str;
    }
  };

  return <div>{formatLongString(description)}</div>;
};

export default ArticleDescr;
