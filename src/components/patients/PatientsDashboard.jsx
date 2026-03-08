import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import PatientTable from './PatientTable';
import PatientCard from './PatientCard';
import PatientModal from './PatientModal';
import PatientFormModal from './PatientFormModal';
import { MOCK_PATIENTS } from '../../data/mockPatients';

const WARDS = ['All Wards', 'Acute Ward', 'ICU', 'Maternity', 'Isolation'];
const STATUSES = ['All Statuses', 'Stable', 'Observation', 'Critical'];

export default function PatientsDashboard() {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [wardFilter, setWardFilter] = useState('All Wards');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Form Modal State
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesWard = wardFilter === 'All Wards' || p.ward === wardFilter;
      const matchesStatus = statusFilter === 'All Statuses' || p.status === statusFilter;

      return matchesSearch && matchesWard && matchesStatus;
    });
  }, [patients, searchQuery, wardFilter, statusFilter]);

  // Read Action
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  // Create Action
  const openAddPatient = () => {
    setPatientToEdit(null);
    setFormModalOpen(true);
  };

  // Update Action
  const openEditPatient = (patient) => {
    setPatientToEdit(patient);
    setFormModalOpen(true);
  };

  // Handle Form Save (both Create and Update)
  const handleSavePatient = (formData) => {
    if (patientToEdit) {
      // Update existing
      setPatients(prev => prev.map(p => p.id === formData.id ? { ...formData } : p));
      
      // If updating the currently viewed patient in modal, update that state too
      if (selectedPatient && selectedPatient.id === formData.id) {
        setSelectedPatient({ ...formData });
      }
    } else {
      // Add new
      const newPatient = {
        ...formData,
        id: `P-${Math.floor(1000 + Math.random() * 9000)}` 
      };
      setPatients(prev => [newPatient, ...prev]);
    }
    setFormModalOpen(false);
  };

  // Delete Action
  const handleDeletePatient = (patientId) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      {/* Header section */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Patients</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor admitted patients</p>
        </div>
        <button 
          onClick={openAddPatient}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Add Patient
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="w-full sm:w-40 pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40 pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-0 overflow-y-auto">
        <div className="hidden md:block">
          {/* Desktop View: Table */}
          <PatientTable 
            patients={filteredPatients} 
            onView={handleViewPatient}
            onEdit={openEditPatient}
            onDelete={handleDeletePatient}
          />
        </div>
        
        <div className="block md:hidden p-4">
          {/* Mobile View: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(p => (
                <PatientCard 
                  key={p.id} 
                  patient={p} 
                  onView={handleViewPatient}
                  onEdit={openEditPatient}
                  onDelete={handleDeletePatient}
                />
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No patients found matching the criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      <PatientModal 
        open={!!selectedPatient} 
        onClose={handleCloseModal} 
        patient={selectedPatient} 
        onEdit={(p) => {
          handleCloseModal();
          openEditPatient(p);
        }}
        onDelete={(id) => {
          handleCloseModal();
          handleDeletePatient(id);
        }}
      />

      {/* Patient Form Modal (Add / Edit) */}
      <PatientFormModal 
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSavePatient}
        patientToEdit={patientToEdit}
      />
    </div>
  );
}
