import React from 'react';
import s from './SignInPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';

const SignInPage: React.FC = () => {
  const getDataFormLogin = (data: IFormData) => {
    console.log(data);
  };

  return (
    <div className={s.signInPage}>
      <MyForm redirect="/sign-up" subText="Login" title="Sign In" addEmail addPassword getFormData={getDataFormLogin} />
    </div>
  );
};

export default SignInPage;
