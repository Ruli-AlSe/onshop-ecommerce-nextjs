'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { IoAlertOutline } from 'react-icons/io5';

import { authenticate } from '@/actions';

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name="email" />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {errorMessage && (
        <div className="flex mb-5">
          <IoAlertOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className={clsx({
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        disabled={isPending}
      >
        Log in
      </button>

      {/* dividing line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create new account
      </Link>
    </form>
  );
};
