import React from 'react';

export default function ActivityTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 w-full overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Bed Activity</h3>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-5 py-3 font-semibold pb-3">Bed ID</th>
              <th className="px-5 py-3 font-semibold pb-3">Department</th>
              <th className="px-5 py-3 font-semibold pb-3">Status</th>
              <th className="px-5 py-3 font-semibold pb-3">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {data?.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-800">{row.id}</td>
                <td className="px-5 py-3 text-gray-600">{row.department}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10
                      ${
                        row.status === 'Occupied'
                          ? 'bg-red-100 text-red-600 border border-red-200'
                          : row.status === 'Available'
                          ? 'bg-green-100 text-green-600 border border-green-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">{row.updated}</td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                  No recent activity
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
