import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { useBeds } from '../../context/BedContext';
import { WARDS } from '../../data/mockData';

export default function AddQueuePatientModal({ open, onClose, defaultTab = 'admin', patientToEdit = null }) {
    const { addToQueue, updateQueuePatient } = useBeds();
    const [form, setForm] = useState({
        patientName: '',
        requiredWard: WARDS[0],
        tab: defaultTab,
        paymentStatus: 'Pending',
        priority: 'Medium'
    });
    const [error, setError] = useState('');

    let price = 2000;
    const wardLow = (form.requiredWard || '').toLowerCase();
    if (wardLow.includes('isolation')) price = 8000;
    else if (wardLow.includes('icu')) price = 10000;
    else if (wardLow.includes('maternity')) price = 1500;
    else if (wardLow.includes('acute')) price = 2000;

    // Sync state on prop change using a ref or during render
    const [prevPatientId, setPrevPatientId] = useState(patientToEdit?.id);
    const [prevOpen, setPrevOpen] = useState(open);

    if (patientToEdit?.id !== prevPatientId || open !== prevOpen) {
        setPrevPatientId(patientToEdit?.id);
        setPrevOpen(open);
        if (patientToEdit && open) {
            setForm({
                patientName: patientToEdit.patientName,
                requiredWard: patientToEdit.requiredWard,
                tab: patientToEdit.tab,
                paymentStatus: patientToEdit.paymentStatus || 'Pending',
                priority: patientToEdit.priority || 'Medium'
            });
        } else if (open) {
            setForm({
                patientName: '',
                requiredWard: WARDS[0],
                tab: defaultTab,
                paymentStatus: 'Pending',
                priority: 'Medium'
            });
        }
    }

    function handleChange(e) {
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));
        setError('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.patientName.trim()) {
            setError('Patient name is required.');
            return;
        }

        if (patientToEdit) {
            updateQueuePatient(patientToEdit.id, {
                patientName: form.patientName.trim(),
                requiredWard: form.requiredWard,
                tab: form.tab,
                priority: form.priority
            });
        } else {
            addToQueue({
                patientName: form.patientName.trim(),
                requiredWard: form.requiredWard,
                tab: form.tab,
                paymentStatus: form.paymentStatus,
                priority: form.priority
            });
        }

        setForm({
            patientName: '',
            requiredWard: WARDS[0],
            tab: defaultTab,
            paymentStatus: 'Pending',
            priority: 'Medium'
        });
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} title={patientToEdit ? "✏️ Edit Patient in Queue" : "➕ Add to Queue"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                        name="patientName"
                        value={form.patientName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Ward</label>
                    <select
                        name="requiredWard"
                        value={form.requiredWard}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Queue Type</label>
                    <select
                        name="tab"
                        value={form.tab}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="admin">Admit</option>
                        <option value="discharge">Discharge</option>
                        <option value="transfer">Transfer</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {form.tab === 'admin' && !patientToEdit && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Amount to be Paid</p>
                            <p className="text-xl font-black text-gray-900">Rs {price.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-xs font-semibold text-gray-600">Payment Status</span>
                            <select
                                name="paymentStatus"
                                value={form.paymentStatus}
                                onChange={handleChange}
                                className="bg-white border text-sm border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose}
                        className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button type="submit"
                        className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                        {patientToEdit ? "Update Patient" : "Add to Queue"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
