import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useBeds } from '../../context/BedContext';
import { WARDS } from '../../data/mockData';

export default function AddBedModal({ open, onClose }) {
  const { addBed, beds } = useBeds();
  const [form, setForm] = useState({ bedNumber: '', ward: WARDS[0] });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.bedNumber.trim()) { setError('Bed number is required.'); return; }
    if (beds.some(b => b.bedNumber.toLowerCase() === form.bedNumber.trim().toLowerCase())) {
      setError('A bed with this number already exists.'); return;
    }
    addBed({ bedNumber: form.bedNumber.trim(), ward: form.ward });
    setForm({ bedNumber: '', ward: WARDS[0] });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="➕  Add New Bed">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bed Number</label>
          <input
            name="bedNumber"
            value={form.bedNumber}
            onChange={handleChange}
            placeholder="e.g. Bed 13"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
          <select name="ward" value={form.ward} onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Add Bed
          </button>
        </div>
      </form>
    </Modal>
  );
}
