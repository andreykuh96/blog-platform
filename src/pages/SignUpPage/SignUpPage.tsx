import React from 'react';
import s from './SignUpPage.module.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUpPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitForm = (data: any): void => {
    console.log(data);
    reset();
  };

  const password = watch('password', '');

  return (
    <div className={s.signUpPage}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={s.form}>
        <div className={s.title}>Create new account</div>
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
        <input value="Create" className={s.submit} type="submit" />
        <div className={s.redirect}>
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
