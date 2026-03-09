import React from 'react';
import { Eye, DownloadCloud } from 'lucide-react';

export default function InvoiceTable({ invoices, onView }) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <DownloadCloud size={32} className="text-gray-300" />
        </div>
        <p className="text-base font-semibold text-gray-600">No invoices available yet.</p>
        <p className="text-sm mt-1 text-gray-400">When you receive an invoice, it will show up here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <th className="px-6 py-4 rounded-tl-xl whitespace-nowrap">Invoice ID</th>
            <th className="px-6 py-4 whitespace-nowrap">Date</th>
            <th className="px-6 py-4 whitespace-nowrap hidden md:table-cell">Description</th>
            <th className="px-6 py-4 whitespace-nowrap text-right">Amount</th>
            <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
            <th className="px-6 py-4 rounded-tr-xl whitespace-nowrap text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                {inv.id}
              </td>
              <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                {inv.date}
              </td>
              <td className="px-6 py-4 text-gray-600 hidden md:table-cell max-w-[200px] truncate" title={inv.description}>
                {inv.description}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 text-right whitespace-nowrap">
                {inv.amount}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-full ${
                  inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {inv.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <button
                  onClick={() => onView(inv)}
                  className="flex items-center justify-center gap-1.5 mx-auto bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Eye size={14} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
