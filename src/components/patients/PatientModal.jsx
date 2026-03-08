import React from 'react';
import { X, User, Activity, Clock, FileText, Droplet } from 'lucide-react';

export default function PatientModal({ open, onClose, patient, onEdit, onDelete }) {
  if (!open || !patient) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-700 border-green-200';
      case 'Observation': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-sm text-gray-500 font-medium">Patient Details</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                {patient.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Patient ID</p>
                <p className="text-lg font-bold text-gray-900">{patient.id}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusBadge(patient.status)}`}>
                {patient.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                <User size={14} /> Demographics
              </p>
              <p className="text-sm font-medium text-gray-900">{patient.age} years old</p>
              <p className="text-sm text-gray-600">{patient.gender}</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                <Droplet size={14} /> Blood Group
              </p>
              <p className="text-sm font-bold text-red-600">{patient.bloodGroup}</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                <Activity size={14} /> Location
              </p>
              <p className="text-sm font-medium text-gray-900">{patient.ward}</p>
              <p className="text-sm text-gray-600">{patient.bedNumber}</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                <Clock size={14} /> Admission
              </p>
              <p className="text-sm font-medium text-gray-900">{patient.admissionDate}</p>
              <p className="text-sm text-gray-500 border border-gray-200 bg-gray-50 rounded px-2 py-0.5 mt-1 inline-block">Admitted</p>
            </div>

            <div className="col-span-2 mt-2">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <FileText size={14} /> Clinical Notes
              </p>
              <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-3 text-sm text-gray-700">
                {patient.notes || "No notes available for this patient."}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center gap-2">
          {onDelete ? (
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this patient?')) {
                  onDelete(patient.id);
                }
              }}
              className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
            >
              Delete Record
            </button>
          ) : <div />}
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
            {onEdit && (
              <button 
                onClick={() => onEdit(patient)}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Edit Record
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
