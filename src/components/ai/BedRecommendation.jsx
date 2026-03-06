import React, { useState } from 'react';
import { Bot, CheckCircle2, BedDouble, AlertCircle, Sparkles } from 'lucide-react';
import { updateAiMockData } from '../../data/aiMockData';

export default function BedRecommendation({ data }) {
  const [assigned, setAssigned] = useState(data?.assigned || false);

  if (!data) return null;

  const handleAssign = () => {
    setAssigned(true);
    updateAiMockData({ 
      bedRecommendation: { ...data, assigned: true } 
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col h-full relative overflow-hidden group">
      {/* Decorative AI background element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-gray-800 font-bold text-sm sm:text-base flex items-center gap-2">
          <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600">
             <Bot size={16} />
          </div>
          AI Bed Allocation
        </h3>
        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-bold border border-amber-100">
           <Sparkles size={12} className="text-amber-500" />
           Recommended
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 text-center relative">
          
          <div className="inline-flex items-center justify-center p-3 bg-white shadow-sm border border-amber-100 text-amber-500 rounded-full mb-3 relative">
             <BedDouble size={24} />
             <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-amber-500 text-white rounded-full p-0.5">
               <Sparkles size={10} />
             </div>
          </div>
          
          <h4 className="text-2xl font-black text-slate-800 mb-1">{data.recommendedBed}</h4>
          <p className="text-xs text-slate-500 font-medium px-4">{data.reason}</p>
          
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">
            <AlertCircle size={12} />
            Priority: {data.priority}
          </div>
        </div>

        <button
          onClick={handleAssign}
          disabled={assigned}
          className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
            assigned 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed' 
            : 'bg-amber-500 hover:bg-amber-600 text-white border border-transparent hover:shadow-md'
          }`}
        >
          {assigned ? (
            <>
              <CheckCircle2 size={16} /> Bed Assigned
            </>
          ) : (
            <>
              <Sparkles size={16} /> Assign Recommended Bed
            </>
          )}
        </button>
      </div>
    </div>
  );
}
