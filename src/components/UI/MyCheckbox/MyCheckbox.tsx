import React from 'react';
import s from './MyCheckbox.module.scss';

const MyCheckbox: React.FC = () => {
  return (
    <label className={s.label}>
      <input type="checkbox" className={s.input} />
      <span className={s.span}>I agree to the processing of my personal information</span>
    </label>
  );
};

export default MyCheckbox;
