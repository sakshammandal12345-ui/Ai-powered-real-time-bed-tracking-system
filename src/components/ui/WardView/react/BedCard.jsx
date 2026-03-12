import React from 'react';

const STATUS_CFG = {
  available: { bg: 'bg-green-100', border: 'border-green-300', bar: 'bg-green-500', text: 'text-green-700', label: 'Available' },
  occupied: { bg: 'bg-blue-100', border: 'border-blue-300', bar: 'bg-blue-500', text: 'text-blue-700', label: 'Occupied' },
  reserved: { bg: 'bg-gray-100', border: 'border-gray-300', bar: 'bg-gray-400', text: 'text-gray-600', label: 'Reserved' },
  discharging: { bg: 'bg-red-100', border: 'border-red-300', bar: 'bg-red-500', text: 'text-red-700', label: 'Discharging' },
  untidy: { bg: 'bg-orange-100', border: 'border-orange-300', bar: 'bg-orange-500', text: 'text-orange-700', label: 'Untidy' },
  faulty: { bg: 'bg-white', border: 'border-gray-200', bar: 'bg-gray-300', text: 'text-gray-500', label: 'Faulty' },
  isolation: { bg: 'bg-yellow-100', border: 'border-yellow-300', bar: 'bg-yellow-500', text: 'text-yellow-700', label: 'Isolation' },
};

// Bed icon SVG (matches Figma pill bed icon)
function BedIcon({ color }) {
  return (
    <svg viewBox="0 0 40 30" className="w-10 h-8" fill="none">
      <rect x="2" y="10" width="36" height="16" rx="5" fill={color} opacity="0.3" />
      <rect x="2" y="10" width="36" height="16" rx="5" stroke={color} strokeWidth="1.5" />
      <rect x="2" y="14" width="12" height="12" rx="3" fill={color} opacity="0.5" />
      <rect x="12" y="10" width="26" height="4" rx="2" fill={color} opacity="0.6" />
      <rect x="3" y="22" width="4" height="6" rx="2" fill={color} />
      <rect x="33" y="22" width="4" height="6" rx="2" fill={color} />
    </svg>
  );
}

function fmtTime(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
}

const BED_COLORS = {
  available: '#22c55e',
  occupied: '#3b82f6',
  reserved: '#9ca3af',
  discharging: '#ef4444',
  untidy: '#f97316',
  faulty: '#cbd5e1',
  isolation: '#eab308',
};

export default function BedCard({ bed, onClick }) {
  const cfg = STATUS_CFG[bed.status] ?? STATUS_CFG.available;
  const timeAgo = fmtTime(bed.timestamp);

  return (
    <button
      type="button"
      onClick={() => onClick(bed)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${cfg.border} ${cfg.bg}
        hover:brightness-95 hover:scale-[1.02] active:scale-[0.99] transition-all duration-150 shadow-sm text-left`}
    >
      {/* Bed icon */}
      <div className="shrink-0">
        <BedIcon color={BED_COLORS[bed.status] ?? '#9ca3af'} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-sm font-black text-gray-900 leading-none truncate">{bed.bedNumber}</p>
          <span className="text-[9px] font-bold text-gray-500 bg-white/50 backdrop-blur-sm border border-gray-200/50 px-1.5 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap">
            {bed.ward}
          </span>
        </div>

        {bed.patientName ? (
          <>
            <p className={`text-xs font-bold ${cfg.text} truncate`}>{bed.patientName}</p>
            {timeAgo && (
              <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                {timeAgo}
              </p>
            )}
          </>
        ) : (
          <p className={`text-xs font-bold ${cfg.text}`}>{cfg.label}</p>
        )}
      </div>
    </button>
  );
}
