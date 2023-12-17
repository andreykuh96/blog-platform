import React from 'react';
import s from './SignInPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { existingUserLogin } from '../../store/reducers/userSlice/userThunk';

const SignInPage: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  const getDataFormLogin = (data: IFormData) => {
    dispatch(existingUserLogin({ user: data }));
  };

  console.log(user);

  return (
    <div className={s.signInPage}>
      <MyForm redirect="/sign-up" subText="Login" title="Sign In" addEmail addPassword getFormData={getDataFormLogin} />
    </div>
  );
};

export default SignInPage;
