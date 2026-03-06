import React from 'react';
import { Bot, AlertTriangle, Sparkles } from 'lucide-react';

export default function EmergencySurgeAlert({ data }) {
  if (!data || !data.alert) return null;

  return (
    <div className="mb-6 relative overflow-hidden bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      
      {/* Background pulse effect */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>

      <div className="flex items-start sm:items-center gap-3 relative z-10">
        <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0 relative">
           <AlertTriangle size={20} className="animate-pulse" />
           <div className="absolute -top-1 -right-1">
             <Sparkles size={12} className="text-red-500 animate-spin-slow" />
           </div>
        </div>
        <div>
          <h3 className="text-red-800 font-bold text-sm sm:text-base flex items-center gap-1.5">
            <Bot size={16} className="text-red-600" />
            AI Emergency Surge Detection
          </h3>
          <p className="text-red-600 text-xs sm:text-sm mt-0.5 font-medium">
            {data.reason}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="bg-white/60 px-3 py-1.5 rounded-lg border border-red-100 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Risk Level</span>
            <span className="text-red-700 font-black text-sm">{data.riskLevel}</span>
        </div>
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap">
            {data.suggestion}
        </div>
      </div>
    </div>
  );
}
