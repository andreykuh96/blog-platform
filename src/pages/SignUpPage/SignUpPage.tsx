import React from 'react';
import s from './SignUpPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';
import { useAppDispatch } from '../../store/hooks';
import { registerNewUser } from '../../store/reducers/userSlice/userThunk';

const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const getDataFormRegister = (data: IFormData) => {
    dispatch(registerNewUser({ user: data }));
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
