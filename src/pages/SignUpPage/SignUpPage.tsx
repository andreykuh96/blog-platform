import React from 'react';
import s from './SignUpPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import { IFormData } from '../../types/form.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerNewUser } from '../../store/reducers/userSlice/userThunk';

const SignUpPage: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  const getDataFormRegister = (data: IFormData) => {
    dispatch(registerNewUser({ user: data }));
  };

  console.log(user);

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
