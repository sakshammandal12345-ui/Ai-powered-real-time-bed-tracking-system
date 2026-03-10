import { ForecastSection } from '../components/ai/ForecastSection';
import AILiveBanner from '../components/ai/AILiveBanner';
import React, { useState, useMemo, useEffect } from 'react';
import { useBeds } from '../context/BedContext';
import BedGrid from '../components/beds/BedGrid';
import AddBedModal from '../components/beds/AddBedModal';
import UpdateStatusModal from '../components/beds/UpdateStatusModal';
import AssignBedModal from '../components/beds/AssignBedModal';
import { WARDS, BED_STATUSES } from '../data/mockData';
import { getAiMockData } from '../data/aiMockData';
import EmergencySurgeAlert from '../components/ai/EmergencySurgeAlert';
import PeakHourPrediction from '../components/ai/PeakHourPrediction';
import BedDemandForecast from '../components/ai/BedDemandForecast';
import NearbyHospitals from '../components/ai/NearbyHospitals';
import BedRecommendation from '../components/ai/BedRecommendation';
import StatsDashboard from './StatsDashboard';
import PatientsDashboard from '../components/patients/PatientsDashboard';
import Billing from './dashboard/Billing';
import BookingHistory from './dashboard/BookingHistory';
import {
  BedDouble, BarChart2, TrendingUp, BookOpen,
  Users, DollarSign, FileText,
  BedDouble as BedAdd, Edit3, PlusCircle, Eye, Map, ChevronDown, Search, Trash2
} from 'lucide-react';

// ── Section tabs (top of main area) ──────────────────────────
const SECTION_TABS = [
  { id: 'ward', label: 'Ward View', icon: BedDouble },
  { id: 'stats', label: 'Stats', icon: BarChart2 },
  { id: 'forecast', label: 'Forecast', icon: TrendingUp },
  { id: 'history', label: 'Booking History', icon: BookOpen },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'billing', label: 'Billing', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: FileText },
];

// ── Status legend bar config ──────────────────────────────────
const LEGEND = [
  { key: 'total', label: 'Total', color: 'bg-blue-600' },
  { key: 'available', label: 'Available', color: 'bg-green-500' },
  { key: 'occupied', label: 'Occupied', color: 'bg-blue-400' },
  { key: 'reserved', label: 'Reserved', color: 'bg-gray-400' },
  { key: 'discharging', label: 'Discharging', color: 'bg-red-400' },
  { key: 'untidy', label: 'Untidy', color: 'bg-orange-400' },
  { key: 'faulty', label: 'Faulty', color: 'bg-slate-400' },
  { key: 'isolation', label: 'Isolation', color: 'bg-yellow-400' },
];

// ── Placeholder views ─────────────────────────────────────────
function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <TrendingUp size={40} className="mb-3 opacity-30" />
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-sm mt-1">Coming soon</p>
    </div>
  );
}

// ── CRUD modal states ─────────────────────────────────────────
const CLOSED = { type: null, bed: null };

export default function Dashboard() {
  const { beds, stats } = useBeds();
  const [section, setSection] = useState('ward');
  const [ward, setWard] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [modal, setModal] = useState(CLOSED);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);

  useEffect(() => {
    const fetchAiData = async () => {
      try {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
        const is_weekend = day >= 5 ? 1 : 0;
        const is_festival = 0;

        // Fetch full day forecast
        const forecastRes = await fetch(
          `http://127.0.0.1:8000/forecast?day=${day}&is_weekend=${is_weekend}&is_festival=${is_festival}`
        );
        const forecastJson = await forecastRes.json();
        const forecast = forecastJson.forecast;

        // Fetch current hour prediction
        const predictRes = await fetch(
          `http://127.0.0.1:8000/predict?hour=${hour}&day=${day}&is_weekend=${is_weekend}&is_festival=${is_festival}`
        );
        const predict = await predictRes.json();

        // Find peak hours — hours where alert_probability > 30
        const peakHours = forecast
          .filter(f => f.alert_probability > 30)
          .map(f => `${String(f.hour).padStart(2, '0')}:00`);

        // Build chart data for PeakHourPrediction
        const activityData = forecast.map(f => ({
          time: `${String(f.hour).padStart(2, '0')}:00`,
          load: f.occupied
        }));

        // Build bed demand for next 6, 12, 24 hours
        const next6 = forecast.slice(0, 6);
        const next12 = forecast.slice(0, 12);
        const next24 = forecast.slice(0, 24);

        const avgOccupied = (arr) => Math.round(
          arr.reduce((sum, f) => sum + f.occupied, 0) / arr.length
        );

        setAiData({
          peakHours: {
            hospital: "BPKIHS Biratnagar",
            predictedPeakHours: peakHours.slice(0, 3),
            expectedPatientLoad: predict.occupied,
            confidence: `${100 - Math.round(predict.alert_probability)}%`,
            activityData
          },
          bedDemand: {
            next6Hours: { icu: Math.round(avgOccupied(next6) * 0.2), general: Math.round(avgOccupied(next6) * 0.8) },
            next12Hours: { icu: Math.round(avgOccupied(next12) * 0.2), general: Math.round(avgOccupied(next12) * 0.8) },
            next24Hours: { icu: Math.round(avgOccupied(next24) * 0.2), general: Math.round(avgOccupied(next24) * 0.8) },
            chartData: [
              { timeframe: '6h', icu: Math.round(avgOccupied(next6) * 0.2), general: Math.round(avgOccupied(next6) * 0.8) },
              { timeframe: '12h', icu: Math.round(avgOccupied(next12) * 0.2), general: Math.round(avgOccupied(next12) * 0.8) },
              { timeframe: '24h', icu: Math.round(avgOccupied(next24) * 0.2), general: Math.round(avgOccupied(next24) * 0.8) },
            ]
          },
          emergencyAlert: {
            alert: predict.alert === 'CRITICAL',
            reason: predict.alert === 'CRITICAL'
              ? `AI detected ${predict.alert_probability}% critical risk at hour ${hour}`
              : null,
            riskLevel: predict.alert_probability > 70 ? 'High' : 'Medium',
            suggestion: 'Prepare additional beds'
          },
          nearbyHospitals: [
            { id: 1, name: "Koshi Hospital", distance: "2.1 km", availableBeds: 12 },
            { id: 2, name: "Nobel Medical College Teaching Hospital", distance: "4.5 km", availableBeds: 8 },
            { id: 3, name: "Birat Medical College Teaching Hospital", distance: "6.2 km", availableBeds: 10 },
            { id: 4, name: "Golden Hospital", distance: "3.8 km", availableBeds: 6 },
            { id: 5, name: "Neuro Cardio and Multispeciality Hospital", distance: "5.0 km", availableBeds: 7 },
          ],
          bedRecommendation: {
            recommendedBed: predict.alert === 'CRITICAL' ? 'ICU-12' : 'GEN-05',
            reason: predict.alert === 'CRITICAL'
              ? 'Critical risk detected — ICU bed reserved'
              : 'Closest available general bed',
            priority: predict.alert === 'CRITICAL' ? 'Critical' : 'Normal',
            assigned: false
          }
        });

      } catch (err) {
        console.error('FastAPI connection failed:', err);
        // Fall back to mock data if API is down
        setAiData(getAiMockData());
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAiData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter beds by ward + search
  const filtered = useMemo(() => {
    let b = ward === 'All' ? beds : beds.filter(b => b.ward === ward);
    if (searchQ.trim()) {
      const q = searchQ.trim().toLowerCase();
      b = b.filter(b =>
        b.bedNumber.toLowerCase().includes(q) ||
        (b.patientName?.toLowerCase() ?? '').includes(q) ||
        b.status.includes(q)
      );
    }
    return b;
  }, [beds, ward, searchQ]);

  // BedCard click → show update/assign modal depending on status
  function handleBedClick(bed) {
    if (bed.status === 'available') {
      setModal({ type: 'assign', bed });
    } else {
      setModal({ type: 'status', bed });
    }
  }

  return (
    <>
      {/* ── Emergency Alert ────────────────────────────────── */}
      <AILiveBanner aiData={aiData} />
      <EmergencySurgeAlert data={aiData?.emergencyAlert} />

      {/* ── Section tab nav ────────────────────────────────── */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-4">
        {/* eslint-disable-next-line no-unused-vars */}
        {SECTION_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all shrink-0
              ${section === id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Ward View content ───────────────────────────────── */}
      {section === 'ward' ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Action toolbar */}
          <div className="flex items-center gap-2 flex-wrap p-3 border-b border-gray-100">
            {/* Ward filter */}
            <div className="flex items-center gap-1.5 bg-white border border-blue-300 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 cursor-pointer hover:bg-blue-50 transition-colors">
              <select
                value={ward}
                onChange={e => setWard(e.target.value)}
                className="bg-transparent text-sm font-semibold text-blue-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Wards</option>
                {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <span className="text-blue-400 ml-1">+</span>
            </div>

            {/* CRUD action buttons */}
            <button
              onClick={() => {
                const avail = filtered.find(b => b.status === 'available');
                if (avail) setModal({ type: 'assign', bed: avail });
              }}
              className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
            >
              <Users size={13} /> Assign Bed
            </button>

            <button
              onClick={() => {
                const b = filtered[0];
                if (b) setModal({ type: 'status', bed: b });
              }}
              className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
            >
              <Edit3 size={13} /> Update Bed Status
            </button>

            <button
              onClick={() => setModal({ type: 'add', bed: null })}
              className="flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm"
            >
              <PlusCircle size={13} /> Add Bed
            </button>

            <button
              className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Eye size={13} /> View Beds
            </button>

            <button
              className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Map size={13} /> Floor Plan
            </button>
          </div>

          {/* Stats legend bar */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide border-b border-gray-100 px-3 py-2 bg-gray-50/50">
            {LEGEND.map(({ key, label, color }) => (
              <div key={key} className="flex items-center gap-1.5 pr-4 shrink-0">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="text-[11px] text-gray-600 font-medium">{label}:</span>
                <span className="text-[11px] font-bold text-gray-900">{String(stats[key] ?? 0).padStart(2, '0')}</span>
              </div>
            ))}
            {/* Search */}
            <div className="ml-auto shrink-0 flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1">
              <Search size={12} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search…"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none w-28"
              />
            </div>
          </div>

          {/* Bed grid — click any bed to open CRUD */}
          <div className="p-4">
            <BedGrid beds={filtered} onBedClick={handleBedClick} />
          </div>

        </div>
      ) : section === 'forecast' ? (
        <ForecastSection aiData={aiData} aiLoading={aiLoading} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <ComingSoon label={SECTION_TABS.find(t => t.id === section)?.label} />
        </div>
      )}

      {/* ── CRUD Modals ─────────────────────────────────────── */}
      <AddBedModal
        open={modal.type === 'add'}
        onClose={() => setModal(CLOSED)}
      />
      <UpdateStatusModal
        open={modal.type === 'status'}
        onClose={() => setModal(CLOSED)}
        bed={modal.bed}
      />
      <AssignBedModal
        open={modal.type === 'assign'}
        onClose={() => setModal(CLOSED)}
        bed={modal.bed}
      />
    </>
  );
}
