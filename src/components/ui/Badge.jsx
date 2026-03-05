import React from 'react';

const colorMap = {
  green:  'bg-green-100  text-green-800',
  blue:   'bg-blue-100   text-blue-800',
  red:    'bg-red-100    text-red-800',
  gray:   'bg-gray-100   text-gray-700',
  orange: 'bg-orange-100 text-orange-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  slate:  'bg-slate-100  text-slate-700',
};

const Badge = ({ children, color = 'blue', className = '' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorMap[color] ?? colorMap.blue} ${className}`}>
    {children}
  </span>
);

export default Badge;
