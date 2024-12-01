import React from 'react';

const PageHeader = ({ title, subtitle, icon: Icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {Icon && (
          <div className="mr-4 p-2 bg-blue-500/10 rounded-lg">
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
