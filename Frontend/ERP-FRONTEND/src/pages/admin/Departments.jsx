import React, { useState } from 'react';
import {
  BuildingLibraryIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    headOfDepartment: '',
    faculty: '',
    students: '',
    courses: ''
  });

  // Dummy data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Computer Science',
      code: 'CS',
      description: 'Department of Computer Science and Engineering',
      headOfDepartment: 'Dr. John Smith',
      faculty: 15,
      students: 300,
      courses: 25,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Electrical Engineering',
      code: 'EE',
      description: 'Department of Electrical and Electronics Engineering',
      headOfDepartment: 'Dr. Sarah Johnson',
      faculty: 12,
      students: 250,
      courses: 20,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      code: 'ME',
      description: 'Department of Mechanical Engineering',
      headOfDepartment: 'Dr. Michael Brown',
      faculty: 10,
      students: 200,
      courses: 18,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CE',
      description: 'Department of Civil Engineering',
      headOfDepartment: 'Dr. Emily Davis',
      faculty: 8,
      students: 180,
      courses: 15,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Mathematics',
      code: 'MATH',
      description: 'Department of Mathematics',
      headOfDepartment: 'Dr. Robert Wilson',
      faculty: 6,
      students: 150,
      courses: 12,
      status: 'Active'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      const updatedDepartments = departments.map(department => {
        if (department.id === editingDepartment.id) {
          return formData;
        }
        return department;
      });
      setDepartments(updatedDepartments);
      toast.success('Department updated successfully');
    } else {
      const newDepartment = {
        id: departments.length + 1,
        ...formData,
        status: 'Active'
      };
      setDepartments([...departments, newDepartment]);
      toast.success('Department created successfully');
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      const updatedDepartments = departments.filter(department => department.id !== id);
      setDepartments(updatedDepartments);
      toast.success('Department deleted successfully');
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      description: department.description,
      headOfDepartment: department.headOfDepartment,
      faculty: department.faculty || '',
      students: department.students || '',
      courses: department.courses || ''
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      headOfDepartment: '',
      faculty: '',
      students: '',
      courses: ''
    });
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.headOfDepartment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/10 rounded-xl p-2">
              <BuildingLibraryIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-white">Department Management</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Department
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Departments List */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-700/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Head
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Members
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 bg-slate-800/30">
                {filteredDepartments.map((department) => (
                  <tr key={department.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{department.name}</div>
                        <div className="text-sm text-slate-400">{department.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">{department.headOfDepartment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <UserGroupIcon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{department.faculty} Faculty</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserGroupIcon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{department.students} Students</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <BookOpenIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{department.courses}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        department.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {department.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(department)}
                          className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(department.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Department */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingDepartment ? 'Edit Department' : 'Add Department'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Head of Department</label>
                <input
                  type="text"
                  name="headOfDepartment"
                  value={formData.headOfDepartment}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Faculty Count</label>
                <input
                  type="number"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Student Count</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Course Count</label>
                <input
                  type="number"
                  name="courses"
                  value={formData.courses}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  {editingDepartment ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
