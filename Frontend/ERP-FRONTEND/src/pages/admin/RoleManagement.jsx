import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { IdentificationIcon, PencilSquareIcon, TrashIcon, PlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const RoleManagement = () => {
  const [roles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access with all privileges',
      users: 5,
      permissions: [
        'User Management',
        'Role Management',
        'System Settings',
        'Reports',
        'All Access'
      ]
    },
    {
      id: 2,
      name: 'Faculty',
      description: 'Access to teaching and student management features',
      users: 50,
      permissions: [
        'Course Management',
        'Grade Management',
        'Attendance Management',
        'Student View'
      ]
    },
    {
      id: 3,
      name: 'Student',
      description: 'Limited access to student-specific features',
      users: 1000,
      permissions: [
        'Course View',
        'Grade View',
        'Attendance View',
        'Library Access'
      ]
    }
  ]);

  return (
    <div>
      <PageHeader
        title="Role Management"
        subtitle="Manage roles and their associated permissions"
        icon={IdentificationIcon}
      />

      {/* Actions Bar */}
      <div className="mb-6 flex justify-end">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{role.name}</h3>
                  <p className="text-sm text-slate-400">{role.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-blue-500 hover:text-blue-600">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button className="p-1 text-red-500 hover:text-red-600">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-400">Active Users</span>
                <span className="text-sm font-medium text-white">{role.users}</span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-2">Permissions</h4>
                <div className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="text-sm text-white bg-white/5 px-3 py-1.5 rounded-lg"
                    >
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Statistics */}
      <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Role Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400">Total Roles</p>
            <p className="text-2xl font-semibold text-white mt-1">3</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="text-2xl font-semibold text-white mt-1">1,055</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Average Permissions per Role</p>
            <p className="text-2xl font-semibold text-white mt-1">4.3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
