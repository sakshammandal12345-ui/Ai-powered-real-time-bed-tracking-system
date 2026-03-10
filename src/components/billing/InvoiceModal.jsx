import React from 'react';
import { X, Download, FileText } from 'lucide-react';

export default function InvoiceModal({ open, onClose, invoice }) {
  if (!open || !invoice) return null;

  const handleDownload = () => {
    // Simulate a download action
    const element = document.createElement('a');
    const mockContent = `Invoice ID: ${invoice.id}\nDate: ${invoice.date}\nDescription: ${invoice.description}\nAmount: ${invoice.amount}\nStatus: ${invoice.status}`;
    const file = new Blob([mockContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${invoice.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Invoice Details</h3>
                <p className="text-xs text-gray-500 font-medium">{invoice.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Invoice ID</span>
                <span className="text-sm font-semibold text-gray-900">{invoice.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Billing Date</span>
                <span className="text-sm font-semibold text-gray-900">{invoice.date}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Description</span>
                <span className="text-sm font-semibold text-gray-900 text-right max-w-[200px] truncate">{invoice.description}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Status</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
              <span className="text-sm text-gray-600 font-semibold">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">{invoice.amount}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 shadow-sm"
            >
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
