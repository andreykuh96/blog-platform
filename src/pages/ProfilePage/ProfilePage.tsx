import React from 'react';
import s from './ProfilePage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateCurrentUser } from '../../store/reducers/userSlice/userThunk';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formatProfile = (data: IFormData): void => {
    dispatch(updateCurrentUser({ user: data }));
    navigate('/', { replace: true });
  };

  return (
    <div className={s.profilePage}>
      <MyForm
        defValue={user}
        getFormData={formatProfile}
        subText="Save"
        title="Edit Profile"
        addName
        addEmail
        addPassword
        addUrl
      />
    </div>
  );
};

export default ProfilePage;
