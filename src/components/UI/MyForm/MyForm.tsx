import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import s from './MyForm.module.scss';
import { IFormData } from '../../../types/form.types';

interface MyFormProps {
  getFormData: (data: IFormData) => void;
  addName?: boolean;
  addEmail?: boolean;
  addPassword?: boolean;
  addRepeatPassword?: boolean;
  addAgree?: boolean;
  addUrl?: boolean;
  title: string;
  subText: string;
  redirect?: string;
}

const MyForm: React.FC<MyFormProps> = ({
  getFormData,
  addName,
  addEmail,
  addPassword,
  addRepeatPassword,
  addAgree,
  addUrl,
  title,
  subText,
  redirect,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: IFormData): void => {
    getFormData(data);
    reset();
  };

  const password = watch('password', '');

  function convertPathToText(path: string): string {
    const string = path.slice(1);
    return string
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.title}>{title}</div>
      {addName && (
        <label className={s.label}>
          <span>Username</span>
          <input
            {...register('username', {
              required: 'Required field',
              minLength: { value: 3, message: 'Minimum 3 characters' },
              maxLength: { value: 20, message: 'Maximum 20 characters' },
            })}
            placeholder="Username"
            type="text"
            className={!errors?.username ? s.input : `${s.input} ${s.input_error}`}
          />
          {errors?.username && <p className={s.error}>{`${errors?.username?.message}`}</p>}
        </label>
      )}
      {addEmail && (
        <label className={s.label}>
          <span>Email address</span>
          <input
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'email must be a valid mail address',
              },
            })}
            placeholder="Email address"
            type="email"
            className={!errors?.email ? s.input : `${s.input} ${s.input_error}`}
          />
          {errors?.email && <p className={s.error}>{`${errors?.email?.message}`}</p>}
        </label>
      )}
      {addPassword && (
        <label className={s.label}>
          <span>Password</span>
          <input
            {...register('password', {
              required: 'Required field',
              minLength: { value: 6, message: 'Minimum 6 characters' },
              maxLength: { value: 40, message: 'Maximum 40 characters' },
            })}
            placeholder="Password"
            type="password"
            className={!errors?.password ? s.input : `${s.input} ${s.input_error}`}
          />
          {errors?.password && <p className={s.error}>{`${errors?.password?.message}`}</p>}
        </label>
      )}
      {addRepeatPassword && (
        <label className={s.label}>
          <span>Repeat Password</span>
          <input
            {...register('repeatPassword', {
              required: 'Required field',
              validate: (value) => value === password || 'Passwords must match',
            })}
            placeholder="Password"
            type="password"
            className={!errors?.repeatPassword ? s.input : `${s.input} ${s.input_error}`}
          />
          {errors?.repeatPassword && <p className={s.error}>{`${errors?.repeatPassword?.message}`}</p>}
        </label>
      )}
      {addAgree && (
        <>
          <hr />
          <label className={s.checkbox}>
            <input
              {...register('agree', {
                required: 'the checkbox for consent to the processing of personal data must be checked',
              })}
              type="checkbox"
              className={s.input}
            />
            <span>I agree to the processing of my personal information</span>
            {errors?.agree && <p className={s.error}>{`${errors?.agree?.message}`}</p>}
          </label>
        </>
      )}
      {addUrl && (
        <label className={s.label}>
          <span>Avatar image (url)</span>
          <input
            {...register('avatar', {
              required: 'Required field',
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'avatar image must be a valid url',
              },
            })}
            placeholder="Avatar image"
            type="text"
            className={!errors?.avatar ? s.input : `${s.input} ${s.input_error}`}
          />
          {errors?.avatar && <p className={s.error}>{`${errors?.avatar?.message}`}</p>}
        </label>
      )}
      <input value={subText} className={s.submit} type="submit" />
      {redirect && (
        <div className={s.redirect}>
          Already have an account? <Link to={redirect}>{convertPathToText(redirect)}</Link>.
        </div>
      )}
    </form>
  );
};

export default MyForm;
