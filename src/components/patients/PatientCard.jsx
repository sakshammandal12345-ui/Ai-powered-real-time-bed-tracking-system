import React from 'react';
import { Eye, Clock, BedDouble } from 'lucide-react';

export default function PatientCard({ patient, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-700 border-green-200';
      case 'Observation': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{patient.name}</h3>
          <p className="text-xs text-gray-500">{patient.id} • {patient.age} y/o {patient.gender}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-gray-600">
          <BedDouble size={14} className="text-gray-400" />
          <span className="font-medium">{patient.bedNumber}</span>
          <span className="text-xs text-gray-400">({patient.ward})</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 justify-end">
          <Clock size={14} className="text-gray-400" />
          <span className="text-xs">{patient.admissionDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-2">
        <button 
          onClick={() => onView(patient)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
        >
          <Eye size={16} /> View
        </button>
        {onEdit && (
          <button 
            onClick={() => onEdit(patient)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-gray-600 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this patient?')) {
                onDelete(patient.id);
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
