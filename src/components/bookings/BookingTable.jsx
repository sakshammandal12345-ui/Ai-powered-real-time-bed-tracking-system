import React from 'react';
import { Eye, Download, XCircle, ArrowUpDown } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const colors = {
    'Completed': 'bg-green-100 text-green-700 border-green-200',
    'Active': 'bg-blue-100 text-blue-700 border-blue-200',
    'Cancelled': 'bg-red-100 text-red-700 border-red-200'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const colors = {
    'Paid': 'bg-emerald-50 text-emerald-600',
    'Pending': 'bg-amber-50 text-amber-600',
    'Refunded': 'bg-gray-100 text-gray-600'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${colors[status] || 'bg-gray-50 text-gray-500'}`}>
      {status}
    </span>
  );
};

export default function BookingTable({ 
  bookings, 
  onViewDetails, 
  onCancel, 
  onDownloadReceipt,
  sortConfig,
  onSort
}) {
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown size={12} className="text-gray-300" />;
    return <ArrowUpDown size={12} className="text-blue-600" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50/50">
            {['Booking ID', 'Patient Name', 'Hospital', 'Bed Type', 'Date', 'Status', 'Amount', 'Actions'].map((head, i) => (
              <th 
                key={head} 
                className={`px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 ${i === 0 ? 'rounded-tl-xl' : ''} ${i === 7 ? 'rounded-tr-xl' : ''}`}
              >
                <div 
                  className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700"
                  onClick={() => {
                    const keys = ['bookingId', 'patientName', 'hospitalName', 'bedType', 'bookingDate', 'status', 'amount'];
                    if (keys[i]) onSort(keys[i]);
                  }}
                >
                  {head}
                  {i < 7 && renderSortIcon(['bookingId', 'patientName', 'hospitalName', 'bedType', 'bookingDate', 'status', 'amount'][i])}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-4 py-4 text-sm font-bold text-blue-600">{booking.bookingId}</td>
              <td className="px-4 py-4">
                <div className="text-sm font-semibold text-gray-900">{booking.patientName}</div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 font-medium">{booking.hospitalName}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{booking.bedType}</td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900 font-medium">{booking.bookingDate}</div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1.5">
                  <StatusBadge status={booking.status} />
                  <PaymentBadge status={booking.paymentStatus} />
                </div>
              </td>
              <td className="px-4 py-4 text-sm font-bold text-gray-900">NPR {booking.amount.toLocaleString()}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onViewDetails(booking)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => onDownloadReceipt(booking.bookingId)}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all"
                    title="Download Receipt"
                  >
                    <Download size={18} />
                  </button>
                  {booking.status === 'Active' && (
                    <button 
                      onClick={() => onCancel(booking.bookingId)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Cancel Booking"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
