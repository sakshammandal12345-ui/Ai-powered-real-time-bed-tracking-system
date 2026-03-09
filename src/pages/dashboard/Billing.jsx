import React, { useState, useMemo } from 'react';
import { CreditCard, Calendar, ShieldCheck, Search } from 'lucide-react';
import { mockInvoices } from '../../mockdata/mockInvoices';
import InvoiceTable from '../../components/billing/InvoiceTable';
import InvoiceModal from '../../components/billing/InvoiceModal';
import InvoiceFormModal from '../../components/billing/InvoiceFormModal';
import { Plus } from 'lucide-react';

export default function Billing() {
  const [searchQ, setSearchQ] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState(mockInvoices);
  
  // State for Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Filter invoices by search query
  const filteredInvoices = useMemo(() => {
    if (!searchQ.trim()) return invoices;
    const q = searchQ.trim().toLowerCase();
    return invoices.filter(
      (inv) =>
        inv.id.toLowerCase().includes(q) || inv.description.toLowerCase().includes(q)
    );
  }, [searchQ, invoices]);

  // Derived state for Summary Cards
  const totalSpent = useMemo(() => {
    return invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => {
        const amount = Number(inv.amount.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
  }, [invoices]);

  const lastPayment = useMemo(() => {
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    if (paidInvoices.length === 0) return null;
    
    // Sort by date descending
    paidInvoices.sort((a, b) => new Date(b.date) - new Date(a.date));
    return paidInvoices[0];
  }, [invoices]);

  // Handlers for CRUD
  const handleOpenCreateForm = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setInvoiceToDelete(id);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceToDelete));
      setInvoiceToDelete(null);
    }
  };

  const handleSaveInvoice = (invoiceData) => {
    if (editingInvoice) {
      // Update existing
      setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? { ...invoiceData, id: inv.id } : inv));
    } else {
      // Create new
      const newId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
      setInvoices(prev => [{ ...invoiceData, id: newId }, ...prev]);
    }
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Billing & Invoices</h2>
          <p className="text-sm text-gray-500 mt-1">View your billing history and manage invoices.</p>
        </div>
        <button
          onClick={handleOpenCreateForm}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add Invoice</span>
        </button>
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
            <p className="text-xl font-bold text-gray-900 mt-0.5">NPR {totalSpent.toLocaleString('en-US')}</p>
          </div>
        </div>

        {/* Last Payment */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Payment</p>
            {lastPayment ? (
              <>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{lastPayment.amount}</p>
                <p className="text-xs font-medium text-gray-400 mt-0.5">on {lastPayment.date}</p>
              </>
            ) : (
              <p className="text-sm font-bold text-gray-400 mt-0.5">No payments yet</p>
            )}
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
          onEdit={handleOpenEditForm}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* ── Invoice Modal (View Details) ─────────────────── */}
      <InvoiceModal 
        open={!!selectedInvoice} 
        onClose={() => setSelectedInvoice(null)} 
        invoice={selectedInvoice} 
      />

      {/* ── Invoice Form Modal (Create/Edit) ─────────────── */}
      <InvoiceFormModal
        key={editingInvoice ? editingInvoice.id : 'new-invoice'}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveInvoice}
        editingInvoice={editingInvoice}
      />

      {/* ── Delete Confirmation Modal ────────────────────── */}
      {invoiceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setInvoiceToDelete(null)} />
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Invoice</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this invoice? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setInvoiceToDelete(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
