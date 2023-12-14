import React from 'react';
import s from './MyForm.module.scss';
import { Link } from 'react-router-dom';

interface MyFormProps {
  children: React.ReactNode;
}

const MyForm: React.FC<MyFormProps> = ({ children }) => {
  return (
    <div className={s.form}>
      <div className={s.title}>Create new account</div>
      <div className={s.content}>{children}</div>
      <div className={s.redirect}>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </div>
    </div>
  );
};

export default MyForm;
