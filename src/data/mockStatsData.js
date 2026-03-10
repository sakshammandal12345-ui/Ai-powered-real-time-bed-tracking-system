export const summaryStats = {
  totalBeds: 120,
  occupiedBeds: 87,
  availableBeds: 33,
  emergencyBeds: 12
};

export const occupancyTrend = [
  { time: "8 AM", occupied: 70 },
  { time: "10 AM", occupied: 78 },
  { time: "12 PM", occupied: 90 },
  { time: "2 PM", occupied: 85 },
  { time: "4 PM", occupied: 87 }
];

export const departmentDistribution = [
  { name: "ICU", value: 20 },
  { name: "Emergency", value: 15 },
  { name: "General Ward", value: 60 },
  { name: "Maternity", value: 25 }
];

export const recentActivity = [
  { id: "B101", department: "ICU", status: "Occupied", updated: "2 min ago" },
  { id: "B205", department: "Emergency", status: "Available", updated: "5 min ago" },
  { id: "B309", department: "General Ward", status: "Occupied", updated: "10 min ago" }
];
