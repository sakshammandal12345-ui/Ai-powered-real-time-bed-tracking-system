import { createContext, useContext, useState } from 'react';
import { INITIAL_BEDS, INITIAL_QUEUE } from '../data/mockData';

const BedContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
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
    const bed = beds.find(b => b.id === bedId);
    
    // Auto-queue if changing status manually to discharging or transfer
    if (bed && bed.status === 'occupied') {
        if (newStatus === 'discharging') {
            addToQueue({ patientName: bed.patientName, requiredWard: bed.ward, tab: 'discharge', priority: 'Medium' });
        } else if (newStatus === 'transfer') { 
            addToQueue({ patientName: bed.patientName, requiredWard: bed.ward, tab: 'transfer', priority: 'High' });
            newStatus = 'untidy'; // Map transfer status implicitly to untidy
        }
    }

    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? {
            ...b,
            status:      newStatus,
            patientName: patientName ?? (newStatus === 'available' || newStatus === 'untidy' ? null : b.patientName),
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

  function dischargePatientToQueue(bedId) {
    const bed = beds.find(b => b.id === bedId);
    if (!bed || !bed.patientName) return;

    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? { ...b, status: 'discharging', timestamp: new Date().toISOString() }
        : b
    ));
    addToQueue({ patientName: bed.patientName, requiredWard: bed.ward, tab: 'discharge', priority: 'Medium' });
  }

  function transferPatientToQueue(bedId) {
    const bed = beds.find(b => b.id === bedId);
    if (!bed || !bed.patientName) return;

    setBeds(prev => prev.map(b =>
      b.id === bedId
        ? { ...b, status: 'untidy', patientName: null, timestamp: new Date().toISOString() }
        : b
    ));
    addToQueue({ patientName: bed.patientName, requiredWard: bed.ward, tab: 'transfer', priority: 'High' });
  }

  // ── Add patient to queue ──────────────────────────────────────
  function addToQueue(patientData) {
    const p = {
      id:   `q${Date.now()}`,
      tab:  'admin',
      timestamp: new Date().toISOString(),
      priority: patientData.priority || 'Medium',
      ...patientData,
    };
    setQueue(prev => [...prev, p]);
  }

  function updateQueuePatient(queueId, updatedData) {
    setQueue(prev => prev.map(q => q.id === queueId ? { ...q, ...updatedData } : q));
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
      assignPatientToBed, dischargePatient, dischargePatientToQueue, transferPatientToQueue,
      addToQueue, updateQueuePatient, removeFromQueue,
    }}>
      {children}
    </BedContext.Provider>
  );
}
