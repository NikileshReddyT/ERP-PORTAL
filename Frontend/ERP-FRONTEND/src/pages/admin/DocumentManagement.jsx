import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import {
  DocumentTextIcon,
  FolderIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  FolderPlusIcon
} from '@heroicons/react/24/outline';

const DocumentManagement = () => {
  const [documents] = useState([
    {
      id: 1,
      name: 'Student Handbook 2024.pdf',
      type: 'PDF',
      size: '2.5 MB',
      category: 'Handbooks',
      uploadedBy: 'John Doe',
      uploadedAt: '2 hours ago',
      status: 'Published'
    },
    {
      id: 2,
      name: 'Faculty Guidelines.docx',
      type: 'DOCX',
      size: '1.8 MB',
      category: 'Guidelines',
      uploadedBy: 'Jane Smith',
      uploadedAt: '1 day ago',
      status: 'Draft'
    },
    {
      id: 3,
      name: 'Course Catalog 2024.pdf',
      type: 'PDF',
      size: '4.2 MB',
      category: 'Catalogs',
      uploadedBy: 'Mike Johnson',
      uploadedAt: '3 days ago',
      status: 'Published'
    }
  ]);

  const categories = [
    { name: 'All Documents', count: 45, icon: DocumentTextIcon },
    { name: 'Handbooks', count: 12, icon: FolderIcon },
    { name: 'Guidelines', count: 8, icon: FolderIcon },
    { name: 'Catalogs', count: 15, icon: FolderIcon },
    { name: 'Forms', count: 10, icon: FolderIcon }
  ];

  return (
    <div>
      <PageHeader
        title="Document Management"
        subtitle="Upload, organize, and manage institutional documents"
        icon={DocumentTextIcon}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Categories */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-white">Categories</h3>
              <button className="p-1 text-blue-500 hover:text-blue-600">
                <FolderPlusIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <category.icon className="h-5 w-5 mr-3" />
                  <span className="flex-1 text-left">{category.name}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Actions Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center">
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Document
            </button>
          </div>

          {/* Documents Table */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Uploaded</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DocumentTextIcon className="h-5 w-5 text-slate-400 mr-3" />
                          <div className="text-sm font-medium text-white">{doc.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">{doc.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">{doc.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-400">{doc.uploadedAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-500 hover:text-blue-600 mr-3">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-blue-500 hover:text-blue-600 mr-3">
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing 1 to 10 of 45 documents
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10">
                Previous
              </button>
              <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;
