import React from 'react';
import { useBeds } from '../../context/BedContext';
import Badge from '../ui/Badge';
import { AlertCircle, Clock } from 'lucide-react';
import useWaitTime from '../../hooks/useWaitTime';

const PRIORITY_COLOR = { High: 'red', Medium: 'orange', Low: 'gray' };

function QueueListItem({ patient }) {
  const waitTime = useWaitTime(patient.timestamp);
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-900 leading-tight">{patient.patientName}</p>
        <Badge color={PRIORITY_COLOR[patient.priority] ?? 'gray'}>{patient.priority}</Badge>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
        <AlertCircle size={11} className="text-gray-400 shrink-0" />
        Ward: <span className="font-medium text-gray-700">{patient.requiredWard}</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Clock size={11} className="text-gray-400 shrink-0" />
        Wait: <span className="font-medium text-gray-700">{waitTime}</span>
      </div>
    </div>
  );
}

export default function QueueList() {
  const { queue } = useBeds();
  // Filter for admin queue to display
  const adminQueue = queue.filter(q => q.tab === 'admin');

  return (
    <div className="space-y-2">
      {adminQueue.map(p => (
        <QueueListItem key={p.id} patient={p} />
      ))}
    </div>
  );
}
