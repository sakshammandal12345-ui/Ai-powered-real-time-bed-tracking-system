import React from 'react';
import { BedDouble, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export default function StatsCards({ data }) {
  const cards = [
    {
      title: 'Total Beds',
      value: data?.totalBeds || 0,
      description: 'Capacity of hospital',
      icon: BedDouble,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Occupied Beds',
      value: data?.occupiedBeds || 0,
      description: 'Currently in use',
      icon: Users,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Available Beds',
      value: data?.availableBeds || 0,
      description: 'Ready for patients',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Emergency Beds',
      value: data?.emergencyBeds || 0,
      description: 'Reserved for critical',
      icon: AlertTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-default"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${card.bgColor}`}>
              <Icon size={24} className={card.color} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
