import React from 'react';
import { Bot, MapPin, Building, Activity, Sparkles } from 'lucide-react';

export default function NearbyHospitals({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col h-full relative overflow-hidden group">
      {/* Decorative AI background element */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2">
          <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600">
             <MapPin size={16} />
          </div>
          Nearby Hospitals Available
        </h3>
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold border border-emerald-100">
           <Bot size={12} className="text-emerald-500" />
           AI Sourced
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 flex-1 overflow-y-auto pr-1 relative z-10 max-h-[160px] custom-scrollbar">
        {data.map((hospital, index) => {
          const isFull = hospital.availableBeds === 0;
          return (
            <div 
              key={hospital.id || index} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isFull ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30'
              } transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${isFull ? 'bg-red-100 text-red-500' : 'bg-white text-emerald-500 shadow-sm'}`}>
                  <Building size={16} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isFull ? 'text-red-900' : 'text-slate-800'}`}>
                    {hospital.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Activity size={10} /> {hospital.distance}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isFull ? 'text-red-400' : 'text-emerald-600'}`}>
                  {isFull ? 'Full' : 'Avl. Beds'}
                </span>
                <span className={`text-lg font-black leading-none ${isFull ? 'text-red-600' : 'text-emerald-500'}`}>
                  {hospital.availableBeds}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
