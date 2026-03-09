import React, { useState, useMemo } from 'react';
import { CreditCard, Calendar, ShieldCheck, Search } from 'lucide-react';
import { mockInvoices } from '../../mockdata/mockInvoices';
import InvoiceTable from '../../components/billing/InvoiceTable';
import InvoiceModal from '../../components/billing/InvoiceModal';

export default function Billing() {
  const [searchQ, setSearchQ] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Filter invoices by search query
  const filteredInvoices = useMemo(() => {
    if (!searchQ.trim()) return mockInvoices;
    const q = searchQ.trim().toLowerCase();
    return mockInvoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(q) || inv.description.toLowerCase().includes(q)
    );
  }, [searchQ]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Billing & Invoices</h2>
        <p className="text-sm text-gray-500 mt-1">View your billing history and download invoices.</p>
      </div>

      {/* ── Summary Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50/50 border-b border-gray-100">
        {/* Total Spent */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">NPR 7,500</p>
          </div>
        </div>

        {/* Last Payment */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Payment</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">NPR 2,500</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5">on 2026-02-10</p>
          </div>
        </div>

        {/* Active Plan */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Plan</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5 truncate max-w-[150px]" title="Hospital Dashboard Pro">
              Hospital Dashboard Pro
            </p>
          </div>
        </div>
      </div>

      {/* ── Invoices Section ─────────────────────────────── */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h3 className="text-base font-bold text-gray-900">Invoice History</h3>
          
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-64 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or description..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-full bg-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <InvoiceTable 
          invoices={filteredInvoices} 
          onView={(invoice) => setSelectedInvoice(invoice)} 
        />
      </div>

      {/* ── Invoice Modal ─────────────────────────────────── */}
      <InvoiceModal 
        open={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        invoice={selectedInvoice} 
      />
    </div>
  );
}
