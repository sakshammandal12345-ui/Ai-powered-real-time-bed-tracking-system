import React from 'react';
import StatsCards from '../components/stats/StatsCards';
import OccupancyChart from '../components/stats/OccupancyChart';
import DepartmentPieChart from '../components/stats/DepartmentPieChart';
import ActivityTable from '../components/stats/ActivityTable';
import { 
  summaryStats, 
  occupancyTrend, 
  departmentDistribution, 
  recentActivity 
} from '../data/mockStatsData';

export default function StatsDashboard() {
  return (
    <div className="w-full flex flex-col space-y-6">
      <StatsCards data={summaryStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <OccupancyChart data={occupancyTrend} />
        <DepartmentPieChart data={departmentDistribution} />
      </div>

      <ActivityTable data={recentActivity} />
    </div>
  );
}
