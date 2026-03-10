import React from 'react';
import { Eye, Edit3, Trash2 } from 'lucide-react';

export default function PatientTable({ patients, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-700 border-green-200';
      case 'Observation': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-gray-50 border-y border-gray-200 text-gray-600 font-medium">
          <tr>
            <th className="px-4 py-3">Patient ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Age / Gender</th>
            <th className="px-4 py-3">Ward</th>
            <th className="px-4 py-3">Bed Number</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Admission Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {patients.length > 0 ? (
            patients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{p.id}</td>
                <td className="px-4 py-3 text-gray-800">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.age} / {p.gender}</td>
                <td className="px-4 py-3 text-gray-600">{p.ward}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{p.bedNumber}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.admissionDate}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onView(p)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {onEdit && (
                      <button 
                        onClick={() => onEdit(p)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Patient"
                      >
                        <Edit3 size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this patient?')) {
                            onDelete(p.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Patient"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                No patients found matching the criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
