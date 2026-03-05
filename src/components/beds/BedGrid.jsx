import React from 'react';
import BedCard from './BedCard';

export default function BedGrid({ beds, onBedClick }) {
  if (!beds || beds.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-16">
        <p className="text-gray-400 text-base font-medium">No beds found for this ward.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {beds.map(bed => (
        <BedCard key={bed.id} bed={bed} onClick={onBedClick} />
      ))}
    </div>
  );
}
