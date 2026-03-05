import { createContext, useContext, useState } from 'react';
import { INITIAL_BEDS, INITIAL_QUEUE } from '../data/mockData';

const BedContext = createContext(null);

export function useBeds() {
  return useContext(BedContext);
}

export function BedProvider({ children }) {
  const [beds,  setBeds]  = useState(INITIAL_BEDS);
  const [queue, setQueue] = useState(INITIAL_QUEUE);

  // ── Bed CRUD ──────────────────────────────────────────────────

  function addBed(bedData) {
    const newBed = {
      id:          `b${Date.now()}`,
      status:      'available',
      patientName: null,
      timestamp:   null,
      ...bedData,
    };
    setBeds(prev => [...prev, newBed]);
  }

  function updateBedStatus(bedId, newStatus, patientName = null) {
    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? {
            ...b,
            status:      newStatus,
            patientName: patientName ?? (newStatus === 'available' ? null : b.patientName),
            timestamp:   newStatus === 'occupied' ? new Date().toISOString() : (newStatus === 'available' ? null : b.timestamp),
          }
        : b
    ));
  }

  function deleteBed(bedId) {
    setBeds(prev => prev.filter(b => b.id !== bedId));
  }

  // ── Assign patient from queue to a bed ────────────────────────
  function assignPatientToBed(bedId, queuePatientId) {
    const patient = queue.find(q => q.id === queuePatientId);
    if (!patient) return;

    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? { ...b, status: 'occupied', patientName: patient.patientName, timestamp: new Date().toISOString() }
        : b
    ));
    setQueue(prev => prev.filter(q => q.id !== queuePatientId));
  }

  // ── Discharge: free a bed and move patient back to discharge queue ──
  function dischargePatient(bedId) {
    const bed = beds.find(b => b.id === bedId);
    if (!bed || !bed.patientName) return;

    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? { ...b, status: 'discharging', timestamp: new Date().toISOString() }
        : b
    ));
  }

  // ── Add patient to queue ──────────────────────────────────────
  function addToQueue(patientData) {
    const p = {
      id:   `q${Date.now()}`,
      tab:  'admin',
      ...patientData,
    };
    setQueue(prev => [...prev, p]);
  }

  // ── Remove from queue ─────────────────────────────────────────
  function removeFromQueue(queueId) {
    setQueue(prev => prev.filter(q => q.id !== queueId));
  }

  // ── Computed stats ────────────────────────────────────────────
  const stats = {
    total:       beds.length,
    available:   beds.filter(b => b.status === 'available').length,
    occupied:    beds.filter(b => b.status === 'occupied').length,
    reserved:    beds.filter(b => b.status === 'reserved').length,
    discharging: beds.filter(b => b.status === 'discharging').length,
    untidy:      beds.filter(b => b.status === 'untidy').length,
    faulty:      beds.filter(b => b.status === 'faulty').length,
    isolation:   beds.filter(b => b.status === 'isolation').length,
  };

  return (
    <BedContext.Provider value={{
      beds, queue, stats,
      addBed, updateBedStatus, deleteBed,
      assignPatientToBed, dischargePatient,
      addToQueue, removeFromQueue,
    }}>
      {children}
    </BedContext.Provider>
  );
}
