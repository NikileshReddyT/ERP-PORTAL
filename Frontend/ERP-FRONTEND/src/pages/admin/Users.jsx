import React from 'react';
import UserManagement from '../../components/admin/UserManagement';

const Users = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200">User Management</h1>
        <p className="text-slate-400 mt-1">Manage system users and their roles</p>
      </div>
      <UserManagement />
    </div>
  );
};

export default Users;
