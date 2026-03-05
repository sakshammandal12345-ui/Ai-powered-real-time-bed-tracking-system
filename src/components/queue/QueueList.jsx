import React from 'react';
import { MOCK_QUEUE } from '../../data/mockData';
import Badge from '../ui/Badge';
import { AlertCircle, Clock } from 'lucide-react';

const PRIORITY_COLOR = { High: 'red', Medium: 'orange', Low: 'gray' };

export default function QueueList() {
  return (
    <div className="space-y-2">
      {MOCK_QUEUE.map(p => (
        <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{p.patientName}</p>
            <Badge color={PRIORITY_COLOR[p.priority] ?? 'gray'}>{p.priority}</Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <AlertCircle size={11} className="text-gray-400 shrink-0" />
            Ward: <span className="font-medium text-gray-700">{p.requiredWard}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={11} className="text-gray-400 shrink-0" />
            Wait: <span className="font-medium text-gray-700">{p.waitTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
