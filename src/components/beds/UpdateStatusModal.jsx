import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useBeds } from '../../context/BedContext';
import { BED_STATUSES } from '../../data/mockData';

export default function UpdateStatusModal({ open, onClose, bed }) {
  const { updateBedStatus } = useBeds();
  const [status, setStatus] = useState(bed?.status ?? 'available');

  if (!bed) return null;

  function handleSubmit(e) {
    e.preventDefault();
    updateBedStatus(bed.id, status);
    onClose();
  }

  const COLOR = {
    available:   'bg-green-100 text-green-700 border-green-300',
    occupied:    'bg-blue-100 text-blue-700 border-blue-300',
    reserved:    'bg-gray-100 text-gray-700 border-gray-300',
    discharging: 'bg-red-100 text-red-700 border-red-300',
    untidy:      'bg-orange-100 text-orange-700 border-orange-300',
    faulty:      'bg-slate-100 text-slate-600 border-slate-300',
    isolation:   'bg-yellow-100 text-yellow-700 border-yellow-300',
  };

  return (
    <Modal open={open} onClose={onClose} title={`Update Status — ${bed.bedNumber}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-500">Select a new status for <strong>{bed.bedNumber}</strong>:</p>
        <div className="grid grid-cols-2 gap-2">
          {BED_STATUSES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left
                ${status === value
                  ? `${COLOR[value]} ring-2 ring-offset-1 ring-blue-500`
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
