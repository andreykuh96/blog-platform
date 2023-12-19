import React from 'react';
import { Link } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import s from './MyForm.module.scss';
import { IFormData } from '../../../types/form.types';
import { Alert } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { onCloseError } from '../../../store/reducers/userSlice/userSlice';
import { IUser } from '../../../types/user.types';
import MyButton from '../MyButton/MyButton';
import { IArticle } from '../../../types/article.types';

interface MyFormProps {
  getFormData: (data: IFormData) => void;
  addTitle?: boolean;
  addShortDescr?: boolean;
  addText?: boolean;
  addName?: boolean;
  addEmail?: boolean;
  addPassword?: boolean;
  addRepeatPassword?: boolean;
  addAgree?: boolean;
  addUrl?: boolean;
  title: string;
  subText: string;
  redirect?: string;
  defValue?: IUser | null;
  addTags?: boolean;
  defArticle?: IArticle | null;
}

const MyForm: React.FC<MyFormProps> = ({
  getFormData,
  addTitle,
  addShortDescr,
  addText,
  addName,
  addEmail,
  addPassword,
  addRepeatPassword,
  addAgree,
  addUrl,
  title,
  subText,
  redirect,
  defValue,
  addTags,
  defArticle,
}) => {
  const userError = useAppSelector((state) => state.userSlice.error);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      username: defValue?.username,
      email: defValue?.email,
      image: defValue?.image,
      title: defArticle?.title,
      description: defArticle?.description,
      body: defArticle?.body,
      tags: [{ name: '' }].concat(defArticle ? defArticle.tagList.map((item) => ({ name: item })) : []),
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const onSubmit = (data: IFormData): void => {
    getFormData(data);
    reset();
    dispatch(onCloseError(null));
  };

  const password = watch('password', '');

  function convertPathToText(path: string): string {
    const string = path.slice(1);
    return string
      .split('-')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
  }

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.target) {
      dispatch(onCloseError(null));
    }
  };

  return (
    <>
      {userError && (
        <Alert
          style={{ maxWidth: 400, margin: '0 auto' }}
          banner
          message={userError}
          description="Email or Password already in use"
          type="error"
          closable
          onClose={onClose}
        />
      )}
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
              {...register('image', {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'avatar image must be a valid url',
                },
              })}
              placeholder="Avatar image"
              type="text"
              className={!errors?.image ? s.input : `${s.input} ${s.input_error}`}
            />
            {errors?.image && <p className={s.error}>{`${errors?.image?.message}`}</p>}
          </label>
        )}
        {addTitle && (
          <label className={s.label}>
            <span>Title</span>
            <input
              {...register('title', {
                required: 'Required field',
              })}
              placeholder="Title"
              type="text"
              className={!errors?.title ? s.input : `${s.input} ${s.input_error}`}
              autoComplete="off"
            />
            {errors?.title && <p className={s.error}>{`${errors?.title?.message}`}</p>}
          </label>
        )}
        {addShortDescr && (
          <label className={s.label}>
            <span>Short description</span>
            <input
              {...register('description', {
                required: 'Required field',
              })}
              placeholder="Title"
              type="text"
              className={!errors?.description ? s.input : `${s.input} ${s.input_error}`}
              autoComplete="off"
            />
            {errors?.description && <p className={s.error}>{`${errors?.description?.message}`}</p>}
          </label>
        )}
        {addText && (
          <label className={s.label}>
            <span>Text</span>
            <textarea
              {...register('body', {
                required: 'Required field',
              })}
              placeholder="Text"
              className={!errors?.body ? s.input : `${s.input} ${s.input_error}`}
              autoComplete="off"
            />
            {errors?.body && <p className={s.error}>{`${errors?.body?.message}`}</p>}
          </label>
        )}
        {addTags && (
          <label className={s.label}>
            <span>Tags</span>
            <div className={s.tagWrapper}>
              <div className={s.tagInput}>
                {fields.map((item, index) => (
                  <div key={item.id} className={s.deleteTag}>
                    <input
                      {...register(`tags.${index}.name`)}
                      placeholder="Tag"
                      type="text"
                      className={s.input}
                      autoComplete="off"
                    />
                    <MyButton
                      onClick={() => {
                        remove(index);
                      }}
                      type="default"
                      color="#F5222D"
                    >
                      Delete
                    </MyButton>
                  </div>
                ))}
              </div>
              <MyButton
                onClick={() => {
                  append({ name: '' });
                }}
                type="default"
                color="#1890FF"
              >
                Add tag
              </MyButton>
            </div>
          </label>
        )}
        <input value={subText} className={s.submit} type="submit" />
        {redirect && (
          <div className={s.redirect}>
            Already have an account? <Link to={redirect}>{convertPathToText(redirect)}</Link>.
          </div>
        )}
      </form>
    </>
  );
};

export default MyForm;
