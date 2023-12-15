import React from 'react';
import s from './ProfilePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';

const ProfilePage: React.FC = () => {
  const formatProfile = (data: IFormData): void => {
    console.log(data);
  };

  return (
    <div className={s.profilePage}>
      <MyForm getFormData={formatProfile} subText="Save" title="Edit Profile" addName addEmail addPassword addUrl />
    </div>
  );
};

export default ProfilePage;
