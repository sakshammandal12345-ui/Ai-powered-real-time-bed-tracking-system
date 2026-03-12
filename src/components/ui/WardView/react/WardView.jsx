import React, { useState, useMemo } from 'react';
import { useBeds } from '../../../../context/BedContext';
import WardViewHtml from '../html/WardView';
import '../css/WardView.css';

const LEGEND = [
    { key: 'total', label: 'Total', color: 'bg-blue-600' },
    { key: 'available', label: 'Available', color: 'bg-green-500' },
    { key: 'occupied', label: 'Occupied', color: 'bg-blue-400' },
    { key: 'reserved', label: 'Reserved', color: 'bg-gray-400' },
    { key: 'discharging', label: 'Discharging', color: 'bg-red-400' },
    { key: 'untidy', label: 'Untidy', color: 'bg-orange-400' },
    { key: 'faulty', label: 'Faulty', color: 'bg-slate-400' },
    { key: 'isolation', label: 'Isolation', color: 'bg-yellow-400' },
];

export default function WardView({ setModal }) {
    const { beds, stats } = useBeds();
    const [ward, setWard] = useState('All');
    const [searchQ, setSearchQ] = useState('');

    // Filter beds by ward + search
    const filtered = useMemo(() => {
        let b = ward === 'All' ? beds : beds.filter(b => b.ward === ward);
        if (searchQ.trim()) {
            const q = searchQ.trim().toLowerCase();
            b = b.filter(b =>
                b.bedNumber.toLowerCase().includes(q) ||
                (b.patientName?.toLowerCase() ?? '').includes(q) ||
                b.status.includes(q)
            );
        }
        return b;
    }, [beds, ward, searchQ]);

    // BedCard click → show update/assign modal depending on status
    function handleBedClick(bed) {
        if (bed.status === 'available') {
            setModal({ type: 'assign', bed });
        } else {
            setModal({ type: 'status', bed });
        }
    }

    return (
        <WardViewHtml
            filtered={filtered}
            ward={ward}
            setWard={setWard}
            searchQ={searchQ}
            setSearchQ={setSearchQ}
            handleBedClick={handleBedClick}
            setModal={setModal}
            stats={stats}
            LEGEND={LEGEND}
        />
    );
}
