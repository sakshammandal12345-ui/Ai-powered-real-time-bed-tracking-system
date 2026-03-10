import React from 'react';
import { X, User, Hospital, Bed, Calendar, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BookingDetailsModal({ open, onClose, booking }) {
  if (!open || !booking) return null;

  const StatusIcon = booking.status === 'Completed' ? CheckCircle2 : (booking.status === 'Cancelled' ? AlertCircle : Clock);
  const statusColor = booking.status === 'Completed' ? 'text-green-600' : (booking.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <StatusIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Booking Details</h3>
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">{booking.bookingId}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Patient Info */}
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <User size={18} />
                  <h4 className="font-bold text-sm uppercase tracking-wide">Patient Information</h4>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-sm font-bold text-gray-900 mb-1">{booking.patientName}</p>
                  <p className="text-xs text-gray-500">Source: {booking.bookingSource}</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <Hospital size={18} />
                  <h4 className="font-bold text-sm uppercase tracking-wide">Hospital & Bed</h4>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Hospital</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.hospitalName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Bed Type</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Bed size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{booking.bedType}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Timeline & Payment */}
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <Calendar size={18} />
                  <h4 className="font-bold text-sm uppercase tracking-wide">Timeline</h4>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-4 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-blue-100"></div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Booked On</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.bookingDate}</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Admission</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.admissionDate}</p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Discharge</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.dischargeDate}</p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <CreditCard size={18} />
                  <h4 className="font-bold text-sm uppercase tracking-wide">Payment Summary</h4>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="text-base font-bold text-gray-900">NPR {booking.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${booking.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between bg-blue-50/50 -mx-6 -mb-8 px-8 py-5">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Current Status</p>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusIcon size={16} className={statusColor} />
                <span className={`text-sm font-bold ${statusColor}`}>{booking.status}</span>
              </div>
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              onClick={onClose}
            >
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
