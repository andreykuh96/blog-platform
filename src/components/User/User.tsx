import React from 'react';
import s from './User.module.scss';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface UserProps {
  username: string;
  createdAt?: string;
  image: string;
}

const User: React.FC<UserProps> = ({ username, createdAt, image }) => {
  function formatDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className={s.user}>
      <div className={s.about}>
        <div className={s.name}>{username}</div>
        {createdAt && <div className={s.date}>{formatDate(createdAt ? createdAt : '')}</div>}
      </div>
      <Avatar size={46} icon={image ? <img src={image} alt="User Avatar" /> : <UserOutlined />} />
    </div>
  );
};

export default User;
