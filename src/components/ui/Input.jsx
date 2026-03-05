import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, id, name, className = '', ...props }, ref) => {
  const inputId = id || name;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        ref={ref}
        className={`h-11 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 bg-white shadow-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60
          ${error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
