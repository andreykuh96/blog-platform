import React from 'react';
import s from './SignUpPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';

const SignUpPage: React.FC = () => {
  const getDataFormRegister = (data: IFormData) => {
    console.log(data);
  };

  return (
    <div className={s.signUpPage}>
      <MyForm
        addName
        addEmail
        addPassword
        addRepeatPassword
        addAgree
        redirect="/sign-in"
        subText="Create"
        title="Create new account"
        getFormData={getDataFormRegister}
      />
    </div>
  );
};

export default SignUpPage;
