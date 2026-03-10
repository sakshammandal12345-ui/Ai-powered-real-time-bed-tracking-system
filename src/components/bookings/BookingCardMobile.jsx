import React from 'react';
import { Eye, Download, XCircle } from 'lucide-react';

export default function BookingCardMobile({ 
  booking, 
  onViewDetails, 
  onCancel, 
  onDownloadReceipt 
}) {
  const statusColors = {
    'Completed': 'bg-green-100 text-green-700',
    'Active': 'bg-blue-100 text-blue-700',
    'Cancelled': 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{booking.bookingId}</p>
          <h4 className="text-base font-bold text-gray-900">{booking.patientName}</h4>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusColors[booking.status]}`}>
          {booking.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Hospital</span>
          <span className="text-xs text-gray-900 font-semibold">{booking.hospitalName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Bed Type</span>
          <span className="text-xs text-gray-600 font-bold bg-gray-50 px-2 py-0.5 rounded">{booking.bedType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Booking Date</span>
          <span className="text-xs text-gray-900 font-semibold">{booking.bookingDate}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-xs text-gray-500 font-medium">Amount</span>
          <span className="text-sm font-bold text-gray-900">NPR {booking.amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onViewDetails(booking)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
        >
          <Eye size={14} /> View Details
        </button>
        <button 
          onClick={() => onDownloadReceipt(booking.bookingId)}
          className="p-2.5 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
          title="Download Receipt"
        >
          <Download size={16} />
        </button>
        {booking.status === 'Active' && (
          <button 
            onClick={() => onCancel(booking.bookingId)}
            className="p-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
            title="Cancel"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
