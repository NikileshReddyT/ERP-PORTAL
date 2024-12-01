import React, { useState, useEffect } from 'react';
import { authService } from '../../services/auth.service';
import { toast } from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'STUDENT'
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await authService.getAllUsers();
            setUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.createUser(newUser);
            toast.success('User created successfully');
            setNewUser({
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                role: 'STUDENT'
            });
            loadUsers();
        } catch (error) {
            toast.error('Failed to create user');
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await authService.deleteUser(id);
                toast.success('User deleted successfully');
                loadUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">User Management</h2>
            
            {/* Create User Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Create New User</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        >
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY">Faculty</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="btn-primary w-full">
                            Create User
                        </button>
                    </div>
                </form>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">{user.username}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                        user.role === 'FACULTY' ? 'bg-green-100 text-green-800' :
                                        'bg-blue-100 text-blue-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
