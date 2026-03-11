import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, XCircle, Search, Filter, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { mockBookings } from '../../mockdata/mockBookings';
import BookingTable from '../../components/bookings/BookingTable';
import BookingFilters from '../../components/bookings/BookingFilters';
import BookingCardMobile from '../../components/bookings/BookingCardMobile';
import BookingDetailsModal from '../../components/bookings/BookingDetailsModal';
import BookingFormModal from '../../components/bookings/BookingFormModal';

export default function BookingHistory() {
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [sortConfig, setSortConfig] = useState({ key: 'bookingDate', direction: 'desc' });

  // Simulate loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filtering Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = 
        b.patientName.toLowerCase().includes(searchQ.toLowerCase()) ||
        b.hospitalName.toLowerCase().includes(searchQ.toLowerCase()) ||
        b.bookingId.toLowerCase().includes(searchQ.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      const matchesType = typeFilter === 'All' || b.bedType === typeFilter;
      const matchesPayment = paymentFilter === 'All' || b.paymentStatus === paymentFilter;
      const matchesDate = !dateFilter || b.bookingDate === dateFilter;

      return matchesSearch && matchesStatus && matchesType && matchesPayment && matchesDate;
    });
  }, [bookings, searchQ, statusFilter, typeFilter, paymentFilter, dateFilter]);

  // Sorting Logic
  const sortedBookings = useMemo(() => {
    const sortableItems = [...filteredBookings];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredBookings, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedBookings.length / pageSize);
  const pagedBookings = sortedBookings.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.map(b => b.bookingId === id ? { ...b, status: 'Cancelled', paymentStatus: 'Refunded' } : b));
    }
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking record? This action cannot be undone.')) {
      setBookings(prev => prev.filter(b => b.bookingId !== id));
    }
  };

  const handleOpenForm = (booking = null) => {
    setEditingBooking(booking);
    setIsFormModalOpen(true);
  };

  const handleSaveBooking = (formData) => {
    if (editingBooking) {
      // Edit
      setBookings(prev => prev.map(b => b.bookingId === editingBooking.bookingId ? formData : b));
    } else {
      // Add
      const newBooking = {
        ...formData,
        bookingId: `BK-${Math.floor(1000 + Math.random() * 9000).toString()}`
      };
      setBookings(prev => [newBooking, ...prev]);
    }
    setIsFormModalOpen(false);
    setEditingBooking(null);
  };

  const handleDownloadReceipt = (id) => {
    alert(`Downloading receipt for booking ${id}...`);
  };

  // Stats
  const stats = {
    total: bookings.length,
    active: bookings.filter(b => b.status === 'Active').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}
        </div>
        <div className="h-96 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header Section ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <BookOpen size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Hospital Portal</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Booking History</h2>
            <p className="text-sm text-gray-500 font-medium">Manage and track all previous bed reservations.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => handleOpenForm()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <BookOpen size={18} />
              Add New Booking
            </button>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-xl">
              <BarChart3 size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-blue-700">Analytics Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total, icon: BookOpen, color: 'blue' },
          { label: 'Active Bookings', value: stats.active, icon: Clock, color: 'blue' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'green' },
          { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'red' }
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <div className={`w-10 h-10 rounded-xl bg-${card.color}-100 flex items-center justify-center text-${card.color}-600`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
              <p className="text-2xl font-black text-gray-900">{card.value.toString().padStart(2, '0')}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter & Search Section ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <BookingFilters 
          searchQ={searchQ} setSearchQ={setSearchQ}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          typeFilter={typeFilter} setTypeFilter={setTypeFilter}
          paymentFilter={paymentFilter} setPaymentFilter={setPaymentFilter}
          dateFilter={dateFilter} setDateFilter={setDateFilter}
        />
      </div>

      {/* ── Bookings Content ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {pagedBookings.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <BookingTable 
                bookings={pagedBookings} 
                onViewDetails={setSelectedBooking}
                onEdit={handleOpenForm}
                onCancel={handleCancelBooking}
                onDownloadReceipt={handleDownloadReceipt}
                onDelete={handleDeleteBooking}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {pagedBookings.map(b => (
                <BookingCardMobile 
                  key={b.bookingId} 
                  booking={b} 
                  onViewDetails={setSelectedBooking}
                  onEdit={handleOpenForm}
                  onCancel={handleCancelBooking}
                  onDownloadReceipt={handleDownloadReceipt}
                  onDelete={handleDeleteBooking}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedBookings.length)} of {sortedBookings.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:border-blue-400'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
              <Search size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQ('');
                setStatusFilter('All');
                setTypeFilter('All');
                setPaymentFilter('All');
                setDateFilter('');
              }}
              className="mt-4 text-blue-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Details Modal ──────────────────────────────────── */}
      <BookingDetailsModal 
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />

      {isFormModalOpen && (
        <BookingFormModal 
          open={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingBooking(null);
          }}
          onSave={handleSaveBooking}
          booking={editingBooking}
          key={editingBooking?.bookingId || 'new-booking'}
        />
      )}
    </div>
  );
}
