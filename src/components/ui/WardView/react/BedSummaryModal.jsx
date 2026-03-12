import React from 'react';
import Modal from '../../Modal';
import { useBeds } from '../../../../context/BedContext';
import { BedDouble, CheckCircle, Clock, XCircle, Trash2, ShieldAlert, Sparkles, UserPlus, ArrowRightLeft } from 'lucide-react';

const STATUS_ICONS = {
    total: { icon: BedDouble, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Total Beds' },
    available: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Available' },
    occupied: { icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Occupied' },
    reserved: { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-50', label: 'Reserved' },
    discharging: { icon: ArrowRightLeft, color: 'text-red-500', bg: 'bg-red-50', label: 'Discharging' },
    untidy: { icon: Sparkles, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Untidy' },
    faulty: { icon: Trash2, color: 'text-slate-500', bg: 'bg-slate-50', label: 'Faulty' },
    isolation: { icon: ShieldAlert, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Isolation' },
    transfer: { icon: ArrowRightLeft, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Transfer' },
};

export default function BedSummaryModal({ open, onClose }) {
    const { stats } = useBeds();

    return (
        <Modal open={open} onClose={onClose} title="📊 Bed Category Summary">
            <div className="space-y-3 py-2">
                <p className="text-sm text-gray-500 mb-4 px-1">
                    Current breakdown of all beds by category across all wards.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(STATUS_ICONS).map(([key, cfg]) => {
                        const Icon = cfg.icon;
                        const count = stats[key] ?? 0;

                        return (
                            <div
                                key={key}
                                className={`flex items-center gap-3 p-4 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md ${key === 'total' ? 'sm:col-span-2 bg-blue-600 border-blue-600' : 'bg-white'}`}
                            >
                                <div className={`p-2 rounded-lg ${key === 'total' ? 'bg-white/20 text-white' : `${cfg.bg} ${cfg.color}`}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[10px] font-bold uppercase tracking-wider ${key === 'total' ? 'text-white/70' : 'text-gray-400'}`}>
                                        {cfg.label}
                                    </p>
                                    <p className={`text-xl font-black ${key === 'total' ? 'text-white' : 'text-gray-900'}`}>
                                        {count.toString().padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4">
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-black transition-colors shadow-lg"
                    >
                        Close Summary
                    </button>
                </div>
            </div>
        </Modal>
    );
}
