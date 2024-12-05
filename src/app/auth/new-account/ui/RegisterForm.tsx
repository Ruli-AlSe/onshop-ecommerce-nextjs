'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import { authenticate, registerUser } from '@/actions';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message!);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    authenticate(undefined, formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name" className="mt-5">
        Full name
      </label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded', {
          'border-red-500': !!errors.name,
        })}
        type="text"
        autoFocus
        {...register('name', { required: '* Name is required' })}
      />
      <ErrorLabel errors={errors} input="name" />

      <label htmlFor="email" className="mt-5">
        Email
      </label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded', {
          'border-red-500': !!errors.email,
        })}
        type="email"
        {...register('email', {
          required: '* Email is required',
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: '* Please write a valid email',
          },
        })}
      />
      <ErrorLabel errors={errors} input="email" />

      <label htmlFor="password" className="mt-5">
        Password
      </label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded', {
          'border-red-500': !!errors.password,
        })}
        type="password"
        {...register('password', { required: '* Password is required' })}
      />
      <ErrorLabel errors={errors} input="password" />

      <span className="mt-2 text-red-500">{errorMessage}</span>
      <button className="btn-primary mt-2">Create account</button>

      {/* dividing line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Already have an account?
      </Link>
    </form>
  );
};

interface ErrorLabelProps {
  errors: FieldErrors<FormInputs>;
  input: keyof FormInputs;
}

const ErrorLabel = ({ errors, input }: ErrorLabelProps) => {
  return <>{errors[input] && <span className="mt-2 text-red-500">{errors[input].message}</span>}</>;
};
