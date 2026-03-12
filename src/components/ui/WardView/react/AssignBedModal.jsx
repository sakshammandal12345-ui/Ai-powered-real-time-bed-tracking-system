import React, { useState } from 'react';
import Modal from '../../Modal';
import { useBeds } from '../../../../context/BedContext';

export default function AssignBedModal({ open, onClose, bed }) {
  const { queue, assignPatientToBed } = useBeds();
  const [selectedQ, setSelectedQ] = useState('');

  if (!bed) return null;

  const waitingPatients = queue.filter(q => q.tab === 'admin');

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedQ) return;
    assignPatientToBed(bed.id, selectedQ);
    setSelectedQ('');
    onClose();
  }



  return (
    <Modal open={open} onClose={onClose} title={`Assign Patient — ${bed.bedNumber}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {waitingPatients.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No patients in the waiting queue.</p>
        ) : (
          <>
            <p className="text-sm text-gray-500">Select a patient from the queue to assign to <strong>{bed.bedNumber}</strong>:</p>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {waitingPatients.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedQ(p.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all
                    ${selectedQ === p.id
                      ? 'bg-blue-50 border-blue-400 text-blue-700 ring-1 ring-blue-400'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                >
                  <p className="font-semibold">{p.patientName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.requiredWard} · Wait: {p.waitTime}</p>
                </button>
              ))}
            </div>



            <div className="flex gap-3 pt-2 mt-4">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={!selectedQ}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none shadow-sm">
                Assign
              </button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
}
