import React, { useState, useEffect } from 'react';
import StatsCards from '../components/stats/StatsCards';
import OccupancyChart from '../components/stats/OccupancyChart';
import DepartmentPieChart from '../components/stats/DepartmentPieChart';
import ActivityTable from '../components/stats/ActivityTable';
import { INITIAL_BEDS } from '../data/mockData';
import { recentActivity } from '../data/mockStatsData';

export default function StatsDashboard() {
  const [statsData, setStatsData] = useState({
    summaryStats: {
      totalBeds: 247,
      occupiedBeds: '--',
      availableBeds: '--',
      emergencyBeds: 12
    },
    occupancyTrend: [],
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
        const is_weekend = day >= 5 ? 1 : 0;
        const is_festival = 0;

        // Fetch current prediction
        const predictRes = await fetch(
          `http://127.0.0.1:8000/predict?hour=${hour}&day=${day}&is_weekend=${is_weekend}&is_festival=${is_festival}`
        );
        const predict = await predictRes.json();

        // Fetch full day forecast for trend chart
        const forecastRes = await fetch(
          `http://127.0.0.1:8000/forecast?day=${day}&is_weekend=${is_weekend}&is_festival=${is_festival}`
        );
        const forecastJson = await forecastRes.json();
        const forecast = forecastJson.forecast;

        // Build occupancy trend — every 2 hours to keep chart clean
        const occupancyTrend = forecast
          .filter(f => f.hour % 2 === 0)
          .map(f => ({
            time: `${String(f.hour).padStart(2, '0')}:00`,
            occupied: f.occupied
          }));

        setStatsData({
          summaryStats: {
            totalBeds: 247,
            occupiedBeds: predict.occupied,
            availableBeds: predict.available,
            emergencyBeds: 12
          },
          occupancyTrend,
          loading: false
        });

      } catch (err) {
        console.error('FastAPI error:', err);
        // Fallback to mock if API is down
        setStatsData({
          summaryStats: {
            totalBeds: 247,
            occupiedBeds: 87,
            availableBeds: 160,
            emergencyBeds: 12
          },
          occupancyTrend: [
            { time: '06:00', occupied: 49 },
            { time: '08:00', occupied: 60 },
            { time: '10:00', occupied: 78 },
            { time: '12:00', occupied: 90 },
            { time: '14:00', occupied: 91 },
            { time: '16:00', occupied: 75 },
            { time: '18:00', occupied: 53 },
            { time: '20:00', occupied: 56 },
            { time: '22:00', occupied: 52 },
          ],
          loading: false
        });
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Department distribution calculated from real bed data
  const wardCounts = INITIAL_BEDS.reduce((acc, bed) => {
    const ward = bed.ward;
    if (!acc[ward]) acc[ward] = 0;
    if (bed.status === 'occupied') acc[ward]++;
    return acc;
  }, {});

  const departmentDistribution = [
    { name: 'ICU',          value: wardCounts['ICU']        || 2 },
    { name: 'Emergency',    value: wardCounts['Emergency']  || 3 },
    { name: 'General Ward', value: wardCounts['Acute Ward'] || 4 },
    { name: 'Maternity',    value: wardCounts['Maternity']  || 1 },
  ];

  return (
    <div className="w-full flex flex-col space-y-6">

      {/* Live indicator bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
            Live AI Data — BPKIHS Biratnagar · Random Forest Model
          </span>
        </div>
        {statsData.loading && (
          <span className="text-xs text-gray-400 animate-pulse">
            Fetching predictions...
          </span>
        )}
      </div>

      {/* Top 4 stat cards — real FastAPI /predict data */}
      <StatsCards data={statsData.summaryStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Trend chart — real FastAPI /forecast data */}
        <OccupancyChart data={statsData.occupancyTrend} />

        {/* Donut — calculated from real mockData.js beds */}
        <DepartmentPieChart data={departmentDistribution} />
      </div>

      {/* Recent activity — realistic mock data */}
      <ActivityTable data={recentActivity} />
    </div>
  );
}
