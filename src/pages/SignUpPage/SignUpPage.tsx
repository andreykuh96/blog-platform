import React from 'react';
import s from './SignUpPage.module.scss';
import MyForm from '../../components/UI/MyForm/MyForm';
import MyCheckbox from '../../components/UI/MyCheckbox/MyCheckbox';
import MyButton from '../../components/UI/MyButton/MyButton';
import MyInput from '../../components/UI/MyInput/MyInput';

const SignUpPage: React.FC = () => {
  return (
    <div className={s.signUpPage}>
      <MyForm>
        <form className={s.form}>
          <MyInput text="Username" placeholder="Username" />
          <MyInput text="Email address" placeholder="Email address" type="email" />
          <MyInput text="Password" placeholder="Password" type="password" />
          <MyInput text="Repeat Password" placeholder="Password" type="password" />
          <hr />
          <div className={s.checkbox}>
            <MyCheckbox />
          </div>
          <MyButton htmlType="submit" block color="#1890FF" type="primary" size="large">
            Create
          </MyButton>
        </form>
      </MyForm>
    </div>
  );
};

export default SignUpPage;
