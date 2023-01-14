import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Form } from '../Form/form';
import { FormButton } from '../FormButton/form-button';
import { FormInput } from '../FormInput/form-input';
import { MainContainer } from '../MainContainer/main-container';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email обязателен')
    .matches(
      /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,})\.([A-z]{2,8})/gm,
      'Неверно указан Email'
    ),
  nickname: yup
    .string()
    .required('Nickname обязателен')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,}/g,
      'Nickname должен содержать минимум 2 символа, строчные и прописные буквы (только латинские)'
    ),

  password: yup
    .string()
    .required('Пароль обязателен')
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g,
      'Пароль должен содержать минимум 6 символов, цифру, строчные и прописные буквы'
    ),
});

export const Register = () => {
  const navigate = useNavigate();
  const handleClickLogBtn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Регистрация
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          {...register('nickname')}
          id="nickname"
          type="text"
          label="Nickname"
          name="nickname"
          error={!!errors.nickname}
          helperText={errors?.nickname?.message}
        />
        <FormInput
          {...register('email')}
          id="email"
          type="email"
          label="Email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormInput
          {...register('password')}
          id="password"
          type="password"
          label="Password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <FormButton type="submit" variant="contained">
          Зарегистрироваться
        </FormButton>
        <FormButton variant="outlined" onClick={handleClickLogBtn}>
          Войти
        </FormButton>
      </Form>
    </MainContainer>
  );
};
