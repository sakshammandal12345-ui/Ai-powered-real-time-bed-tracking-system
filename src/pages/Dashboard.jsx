import { ForecastSection } from '../components/ai/ForecastSection';
import AILiveBanner from '../components/ai/AILiveBanner';
import React, { useState, useEffect } from 'react';
import BedGrid from '../components/beds/BedGrid';
import AddBedModal from '../components/beds/AddBedModal';
import UpdateStatusModal from '../components/beds/UpdateStatusModal';
import AssignBedModal from '../components/beds/AssignBedModal';
import { WARDS, BED_STATUSES } from '../data/mockData';
import { getAiMockData } from '../data/aiMockData';
import PeakHourPrediction from '../components/ai/PeakHourPrediction';
import BedDemandForecast from '../components/ai/BedDemandForecast';
import NearbyHospitals from '../components/ai/NearbyHospitals';
import BedRecommendation from '../components/ai/BedRecommendation';
import StatsDashboard from './StatsDashboard';
import PatientsDashboard from '../components/patients/PatientsDashboard';
import Billing from './dashboard/Billing';
import BookingHistory from './dashboard/BookingHistory';
import WardView from '../components/ui/WardView/react/WardView';
import BedSummaryModal from '../components/ui/WardView/react/BedSummaryModal';
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
  const [section, setSection] = useState('ward');
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



  return (
    <>
      {/* ── Emergency Alert ────────────────────────────────── */}
      <AILiveBanner aiData={aiData} />

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
        <WardView setModal={setModal} />
         ) : section === 'forecast' ? (
        <ForecastSection aiData={aiData} aiLoading={aiLoading} />
      ) : section === 'stats' ? (
        <StatsDashboard />
      ) : section === 'patients' ? (
        <PatientsDashboard />
      ) : section === 'billing' ? (
        <Billing />
      ) : section === 'history' ? (
        <BookingHistory />
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
      <BedSummaryModal
        open={modal.type === 'summary'}
        onClose={() => setModal(CLOSED)}
      />
    </>
  );
}
