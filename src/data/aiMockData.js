export const initialAiData = {
  peakHours: {
    hospital: "Biratnagar Central Hospital",
    predictedPeakHours: ["10:00", "11:00", "18:00"],
    expectedPatientLoad: 35,
    confidence: "87%",
    // Mock chart data for 24 hours
    activityData: [
      { time: '00:00', load: 5 }, { time: '02:00', load: 3 },
      { time: '04:00', load: 2 }, { time: '06:00', load: 8 },
      { time: '08:00', load: 20 }, { time: '10:00', load: 45 },
      { time: '12:00', load: 30 }, { time: '14:00', load: 25 },
      { time: '16:00', load: 28 }, { time: '18:00', load: 40 },
      { time: '20:00', load: 22 }, { time: '22:00', load: 12 }
    ]
  },
  bedDemand: {
    next6Hours: { icu: 4, general: 12 },
    next12Hours: { icu: 7, general: 18 },
    next24Hours: { icu: 10, general: 25 },
    chartData: [
      { timeframe: '6h', icu: 4, general: 12 },
      { timeframe: '12h', icu: 7, general: 18 },
      { timeframe: '24h', icu: 10, general: 25 },
    ]
  },
  emergencyAlert: {
    alert: false,
    reason: "Admission rate exceeds normal threshold",
    riskLevel: "High",
    suggestion: "Prepare additional beds"
  },
  nearbyHospitals: [
    { id: 1, name: "Koshi Hospital", distance: "2.1 km", availableBeds: 12 },
    { id: 2, name: "Nobel Medical College Teaching Hospital", distance: "4.5 km", availableBeds: 8 },
    { id: 3, name: "Birat Medical College Teaching Hospital", distance: "6.2 km", availableBeds: 10 },
    { id: 4, name: "Golden Hospital", distance: "3.8 km", availableBeds: 6 },
    { id: 5, name: "Neuro Cardio and Multispeciality Hospital", distance: "5.0 km", availableBeds: 7 }
  ],
  bedRecommendation: {
    recommendedBed: "ICU-12",
    reason: "Closest ICU bed available and cleaned",
    priority: "Critical",
    assigned: false // to toggle when user assigns the bed
  }
};

export const getAiMockData = () => {
  const storedData = localStorage.getItem('aiMockData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return initialAiData;
};

export const updateAiMockData = (updates) => {
  const currentData = getAiMockData();
  const newData = { ...currentData, ...updates };
  localStorage.setItem('aiMockData', JSON.stringify(newData));
  return newData;
};
