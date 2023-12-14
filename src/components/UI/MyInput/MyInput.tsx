import React from 'react';
import s from './MyInput.module.scss';

interface MyInputProps {
  text: string;
  placeholder: string;
  type?: 'password' | 'email';
}

const MyInput: React.FC<MyInputProps> = ({ text, type = 'text', placeholder }) => {
  return (
    <label className={s.label}>
      <span className={s.span}>{text}</span>
      <input type={type} placeholder={placeholder} className={s.input} />
    </label>
  );
};

export default MyInput;
