import React, { useState, useEffect } from 'react';
import { X, Users, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, Clock as ClockIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBeds } from '../../context/BedContext';
import hospitalImg from '../../assets/hospital.png';
import useWaitTime from '../../hooks/useWaitTime';
import AddQueuePatientModal from '../queue/AddQueuePatientModal';

const TABS = ['admin', 'discharge', 'transfer'];
const TAB_LABELS = { admin: 'Admin', discharge: 'Discharge', transfer: 'Transfer' };
const PAGE_SIZE = 4;

function RealTimeClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-md">
      <ClockIcon size={12} />
      <span>{time.toLocaleTimeString()}</span>
    </div>
  );
}

function QueueItem({ patient, onEdit, onDelete }) {
  const waitTime = useWaitTime(patient.timestamp);
  return (
    <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm hover:shadow-md transition-shadow group">
      <div>
        <p className="text-sm font-semibold text-gray-800">{patient.patientName}</p>
        <p className="text-xs text-blue-500 font-medium">{patient.requiredWard}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400 whitespace-nowrap mb-1">{waitTime}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(patient)} className="text-blue-400 hover:text-blue-600 transition-colors">
            <Edit2 size={12} />
          </button>
          <button onClick={() => onDelete(patient.id)} className="text-red-400 hover:text-red-600 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const [isAddQueueOpen, setAddQueueOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const { queue, removeFromQueue } = useBeds();
  const [activeTab, setActiveTab] = useState('admin');
  const [page, setPage] = useState(1);

  const tabQueue = queue.filter(q => q.tab === activeTab);
  const totalPages = Math.max(1, Math.ceil(tabQueue.length / PAGE_SIZE));
  const paged = tabQueue.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleTabChange(tab) { setActiveTab(tab); setPage(1); }

  function handleEdit(patient) {
    setPatientToEdit(patient);
    setAddQueueOpen(true);
  }

  function handleCloseModal() {
    setAddQueueOpen(false);
    setPatientToEdit(null);
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}

      <aside className={[
        'flex flex-col bg-white h-full border-r border-gray-200',
        'fixed inset-y-0 left-0 z-50 w-72 shadow-2xl',
        'transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:relative md:translate-x-0 md:w-64 md:shadow-none md:z-auto',
      ].join(' ')}>

        {/* Close btn — mobile only */}
        <div className="flex items-center justify-end px-4 pt-3 md:hidden">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Hospital illustration */}
        <div className="flex justify-center px-4 pt-2 shrink-0">
          <img src={hospitalImg} alt="Hospital" className="w-full max-h-40 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center px-4 pb-3 shrink-0">
          <p className="text-blue-600 font-extrabold text-sm uppercase leading-tight">AI Powered</p>
          <p className="text-blue-600 font-extrabold text-sm uppercase leading-tight">Real-Time Bed Tracking System</p>
        </div>

        {/* Queuing system label */}
        <div className="flex items-center justify-between py-2 border-y border-gray-100 mx-4 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-500" />
            <span className="text-blue-600 font-semibold text-sm">Queuing System</span>
          </div>
          <RealTimeClock />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-2 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors border-b-2
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between px-3 py-2 shrink-0">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 disabled:opacity-30 transition-colors">
            <ChevronLeft size={14} /> Previous
          </button>
          <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{page}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 disabled:opacity-30 transition-colors">
            Next <ChevronRight size={14} />
          </button>
          <button onClick={() => setAddQueueOpen(true)} className="text-blue-500 hover:text-blue-700 ml-1">
            <Plus size={15} />
          </button>
        </div>

        {/* Queue list */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 min-h-0 scrollbar-thin">
          {paged.length === 0 ? (
            <p className="text-center text-gray-400 text-xs py-6">No patients in this queue.</p>
          ) : (
            <div className="space-y-2">
              {paged.map(p => (
                <QueueItem key={p.id} patient={p} onEdit={handleEdit} onDelete={removeFromQueue} />
              ))}
            </div>
          )}
        </div>

        {/* User footer */}
        <div className="px-4 py-3 border-t border-gray-100 shrink-0 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">{user?.name ?? 'User'} · {user?.email ?? ''}</p>
        </div>
      </aside>

      <AddQueuePatientModal
        open={isAddQueueOpen}
        onClose={handleCloseModal}
        defaultTab={activeTab}
        patientToEdit={patientToEdit}
      />
    </>
  );
}
