import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Bot, BedDouble, TrendingUp, Cpu } from 'lucide-react';

export default function BedDemandForecast({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col h-full relative overflow-hidden group">
      
      {/* Decorative AI background element */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
             <Cpu size={16} />
          </div>
          AI Bed Demand Forecast
        </h3>
        <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold border border-blue-100">
           <TrendingUp size={12} className="text-blue-500" />
           Projected
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 relative z-10">
        {[
          { label: 'Next 6h', data: data.next6Hours },
          { label: 'Next 12h', data: data.next12Hours },
          { label: 'Next 24h', data: data.next24Hours }
        ].map((timeframe, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{timeframe.label}</span>
            <div className="flex w-full justify-between px-1 text-xs">
              <div className="flex flex-col items-center">
                <span className="text-red-500 font-bold text-lg leading-none">{timeframe.data.icu}</span>
                <span className="text-[9px] text-slate-500">ICU</span>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-blue-600 font-bold text-lg leading-none">{timeframe.data.general}</span>
                <span className="text-[9px] text-slate-500">GEN</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[140px] relative z-10 w-full mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={12} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="timeframe" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{fontSize: '10px'}} iconType="circle" iconSize={6} />
            <Bar dataKey="icu" name="ICU Beds" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="general" name="General Beds" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
