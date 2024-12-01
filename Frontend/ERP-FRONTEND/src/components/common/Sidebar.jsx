import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../redux/slices/authSlice';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  HomeModernIcon,
  UserIcon,
  UsersIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isOpen = useSelector((state) => state.ui.sidebarOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navigation = {
    ROLE_ADMIN: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
      { name: 'User Management', href: '/admin/users', icon: UsersIcon },
      { name: 'Role Management', href: '/admin/roles', icon: ShieldCheckIcon },
      { name: 'Document Management', href: '/admin/documents', icon: DocumentTextIcon },
      { name: 'Students', href: '/admin/students', icon: UserGroupIcon },
      { name: 'Faculty', href: '/admin/faculty', icon: AcademicCapIcon },
      { name: 'Courses', href: '/admin/courses', icon: BookOpenIcon },
      { name: 'Reports', href: '/admin/reports', icon: ClipboardDocumentCheckIcon },
      { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
      { name: 'Audit Logs', href: '/admin/audit-logs', icon: DocumentIcon },
      { name: 'Compliance', href: '/admin/compliance', icon: DocumentDuplicateIcon },
      { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
    ],
    ROLE_FACULTY: [
      { name: 'Dashboard', href: '/faculty/dashboard', icon: HomeIcon },
      { name: 'My Classes', href: '/faculty/classes', icon: UserGroupIcon },
      { name: 'Course Materials', href: '/faculty/materials', icon: BookOpenIcon },
      { name: 'Post Attendance', href: '/faculty/attendance', icon: ClipboardDocumentCheckIcon },
      { name: 'Assessments', href: '/faculty/assessments', icon: ClipboardDocumentCheckIcon },
      { name: 'Grade Management', href: '/faculty/grades', icon: AcademicCapIcon },
      { name: 'Schedule', href: '/faculty/schedule', icon: CalendarIcon },
      { name: 'Research Work', href: '/faculty/research', icon: ChartBarIcon },
      { name: 'Leave Management', href: '/faculty/leave', icon: ClockIcon },
    ],
    ROLE_STUDENT: [
      { name: 'Dashboard', href: '/student/dashboard', icon: HomeIcon },
      { name: 'My Courses', href: '/student/courses', icon: BookOpenIcon },
      { name: 'Assignments', href: '/student/assignments', icon: ClipboardDocumentCheckIcon },
      { name: 'Attendance', href: '/student/attendance', icon: ClipboardDocumentCheckIcon },
      { name: 'Exams', href: '/student/exams', icon: DocumentTextIcon },
      { name: 'Grades', href: '/student/grades', icon: AcademicCapIcon },
      { name: 'Schedule', href: '/student/schedule', icon: CalendarIcon },
      { name: 'Materials', href: '/student/materials', icon: BookOpenIcon },
      { name: 'Fees', href: '/student/fees', icon: CurrencyDollarIcon },
      { name: 'Profile', href: '/student/profile', icon: UserIcon },
    ],
  };

  const userRole = user?.roles?.[0] || 'ROLE_STUDENT';
  const userNavigation = navigation[userRole] || [];

  return (
    <aside className="h-full bg-white/10 backdrop-blur-xl border-r border-white/10">
      <div className="flex h-full flex-col">
        {/* Header/Logo */}
        <div className="flex items-center h-16 px-6 bg-white/5">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <HomeIcon className="h-6 w-6 text-blue-500" />
          </div>
          <span className="ml-3 text-xl font-semibold text-white">ERP Portal</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {userNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="flex flex-col gap-2 p-4 bg-white/5">
          <div className="flex items-center px-4 py-3 text-slate-300">
            <UserIcon className="h-5 w-5 mr-3" />
            <span className="text-sm font-medium truncate">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
