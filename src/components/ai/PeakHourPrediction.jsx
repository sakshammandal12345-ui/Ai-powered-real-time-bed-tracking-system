import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { Bot, Sparkles, Clock, Users } from 'lucide-react';

export default function PeakHourPrediction({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col h-full relative overflow-hidden group">
      {/* Decorative AI background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2">
          <div className="bg-purple-100 p-1.5 rounded-lg text-purple-600">
             <Bot size={16} />
          </div>
          AI Predicted Peak Hours
        </h3>
        <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-bold border border-purple-100">
           <Sparkles size={12} className="text-purple-500" />
           {data.confidence} Confidence
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
             <Clock size={14} />
             <span className="text-xs font-medium uppercase tracking-wide">Peak Times</span>
          </div>
          <div className="flex flex-wrap gap-1">
             {data.predictedPeakHours.map((t, i) => (
                <span key={i} className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-2 py-0.5 rounded shadow-sm">{t}</span>
             ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-blue-600 mb-1">
             <Users size={14} />
             <span className="text-xs font-medium uppercase tracking-wide">Expected Load</span>
          </div>
          <div className="text-xl font-black text-blue-900">
             {data.expectedPatientLoad} <span className="text-sm font-medium text-blue-600">pts/hr</span>
          </div>
        </div>
      </div>

      <div className="h-[180px] relative z-10 w-full mt-2">
        <span className="text-[10px] text-gray-400 font-medium mb-2 block uppercase tracking-wider">24h Patient Activity Forecast</span>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.activityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#6d28d9', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="load" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
