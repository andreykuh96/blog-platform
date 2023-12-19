import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ConfigProvider, Statistic } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { favoriteAnArticle, unfavoriteAnArticle } from '../../../store/reducers/articleSlice/articleThunk';

interface MyStatisticProps {
  favoritesCount: number;
  slug: string;
  favorited: boolean;
}

const MyStatistic: React.FC<MyStatisticProps> = ({ favoritesCount, slug, favorited }) => {
  const user = useAppSelector((state) => state.userSlice.user);
  const [likeCount, setLikeCount] = React.useState(favoritesCount);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    if (isFavorite) {
      dispatch(unfavoriteAnArticle(slug));
      setLikeCount((prev) => prev - 1);
      setIsFavorite(false);
    } else {
      dispatch(favoriteAnArticle(slug));
      setLikeCount((prev) => prev + 1);
      setIsFavorite(true);
    }
  };

  React.useEffect(() => {}, [likeCount]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Statistic: {
            contentFontSize: 16,
            fontFamily: 'Inter',
          },
        },
      }}
    >
      <Statistic
        value={likeCount}
        prefix={
          isFavorite ? (
            <HeartFilled style={{ color: 'red' }} onClick={user ? toggleLike : undefined} />
          ) : (
            <HeartOutlined onClick={user ? toggleLike : undefined} />
          )
        }
      />
    </ConfigProvider>
  );
};

export default MyStatistic;
