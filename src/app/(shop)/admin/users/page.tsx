// https://tailwindcomponents.com/component/hoverable-table

import { redirect } from 'next/navigation';

import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Users maintenance" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
