import React from 'react';
import BedGrid from '../react/BedGrid';
import { Search, Users, Edit3, PlusCircle, Eye } from 'lucide-react';
import { WARDS } from '../../../../data/mockData';

export default function WardView({
    filtered,
    ward,
    setWard,
    searchQ,
    setSearchQ,
    handleBedClick,
    setModal,
    stats,
    LEGEND
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Action toolbar */}
            <div className="flex items-center gap-2 flex-wrap p-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5 bg-white border border-blue-300 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 cursor-pointer hover:bg-blue-50 transition-colors">
                    <select
                        value={ward}
                        onChange={e => setWard(e.target.value)}
                        className="bg-transparent text-sm font-semibold text-blue-700 focus:outline-none cursor-pointer"
                    >
                        <option value="All">All Wards</option>
                        {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                    <span className="text-blue-400 ml-1">+</span>
                </div>

                <button
                    onClick={() => {
                        const avail = filtered.find(b => b.status === 'available');
                        if (avail) setModal({ type: 'assign', bed: avail });
                    }}
                    className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
                >
                    <Users size={13} /> Assign Bed
                </button>

                <button
                    onClick={() => {
                        const b = filtered[0];
                        if (b) setModal({ type: 'status', bed: b });
                    }}
                    className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
                >
                    <Edit3 size={13} /> Update Bed Status
                </button>

                <button
                    onClick={() => setModal({ type: 'add', bed: null })}
                    className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm"
                >
                    <PlusCircle size={13} /> Add Bed
                </button>

                <button
                    onClick={() => setModal({ type: 'summary', bed: null })}
                    className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
                >
                    <Eye size={13} /> View Beds
                </button>

                <div className="ml-auto min-w-[200px] flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-md transition-all group">
                    <Search size={14} className="text-gray-400 group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search by Patient Name…"
                        value={searchQ}
                        onChange={e => setSearchQ(e.target.value)}
                        className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-full font-medium"
                    />
                </div>
            </div>

            {/* Stats legend bar */}
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide border-b border-gray-100 px-3 py-2 bg-gray-50/50">
                {LEGEND.map(({ key, label, color }) => (
                    <div key={key} className="flex items-center gap-1.5 pr-4 shrink-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                        <span className="text-[11px] text-gray-600 font-medium">{label}:</span>
                        <span className="text-[11px] font-bold text-gray-900">{String(stats[key] ?? 0).padStart(2, '0')}</span>
                    </div>
                ))}
            </div>

            <div className="p-4">
                <BedGrid beds={filtered} onBedClick={handleBedClick} />
            </div>
        </div>
    );
}
