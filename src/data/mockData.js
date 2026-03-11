// ── Beds ──────────────────────────────────────────────────────
export const INITIAL_BEDS = [
  { id: 'b01', bedNumber: 'Bed 01', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Acute Ward' },
  { id: 'b02', bedNumber: 'Bed 02', status: 'discharging', patientName: 'Jane Smith',   timestamp: new Date(Date.now() - 1000*60*15).toISOString(), ward: 'Acute Ward' },
  { id: 'b03', bedNumber: 'Bed 03', status: 'reserved',    patientName: null,           timestamp: null,                  ward: 'Acute Ward' },
  { id: 'b04', bedNumber: 'Bed 04', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Acute Ward' },
  { id: 'b05', bedNumber: 'Bed 05', status: 'occupied',    patientName: 'Manoj Tamang', timestamp: new Date(Date.now() - 1000*60*30).toISOString(), ward: 'Acute Ward' },
  { id: 'b06', bedNumber: 'Bed 06', status: 'faulty',      patientName: null,           timestamp: null,                  ward: 'Acute Ward' },
  { id: 'b07', bedNumber: 'Bed 07', status: 'available',   patientName: null,           timestamp: null,                  ward: 'ICU'        },
  { id: 'b08', bedNumber: 'Bed 08', status: 'untidy',      patientName: null,           timestamp: null,                  ward: 'ICU'        },
  { id: 'b09', bedNumber: 'Bed 09', status: 'discharging', patientName: 'Ram Yadav',    timestamp: new Date(Date.now() - 1000*60*45).toISOString(), ward: 'ICU'        },
  { id: 'b10', bedNumber: 'Bed 10', status: 'occupied',    patientName: 'Hari Rai',     timestamp: new Date(Date.now() - 1000*60*60).toISOString(), ward: 'ICU'        },
  { id: 'b11', bedNumber: 'Bed 11', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Maternity'  },
  { id: 'b12', bedNumber: 'Bed 12', status: 'isolation',   patientName: 'Riya Tamang',  timestamp: new Date(Date.now() - 1000*60*90).toISOString(), ward: 'Maternity'  },
  { id: 'b13', bedNumber: 'Bed 13', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Maternity'  },
  { id: 'b14', bedNumber: 'Bed 14', status: 'occupied',    patientName: 'Sita Sharma',  timestamp: new Date(Date.now() - 1000*60*20).toISOString(), ward: 'Maternity'  },
  { id: 'b15', bedNumber: 'Bed 15', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Emergency'  },
  { id: 'b16', bedNumber: 'Bed 16', status: 'occupied',    patientName: 'Raj Kumar',    timestamp: new Date(Date.now() - 1000*60*10).toISOString(), ward: 'Emergency'  },
  { id: 'b17', bedNumber: 'Bed 17', status: 'reserved',    patientName: null,           timestamp: null,                  ward: 'Emergency'  },
  { id: 'b18', bedNumber: 'Bed 18', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Emergency'  },
  { id: 'b19', bedNumber: 'Bed 19', status: 'occupied',    patientName: 'Priya Thapa',  timestamp: new Date(Date.now() - 1000*60*25).toISOString(), ward: 'Acute Ward' },
  { id: 'b20', bedNumber: 'Bed 20', status: 'available',   patientName: null,           timestamp: null,                  ward: 'Acute Ward' },
];

// ── Queue (Admin tab in sidebar) ───────────────────────────────
export const INITIAL_QUEUE = [
  { id: 'q1', patientName: 'Manoj Tamang', waitTime: '10 minutes ago', priority: 'High',   requiredWard: 'Acute Ward', tab: 'admin'     },
  { id: 'q2', patientName: 'Hari Rai',     waitTime: '25 minutes ago', priority: 'Medium', requiredWard: 'ICU',        tab: 'admin'     },
  { id: 'q3', patientName: 'Ram Yadav',    waitTime: '1 hour ago',     priority: 'Low',    requiredWard: 'ICU',        tab: 'admin'     },
  { id: 'q4', patientName: 'Riya Tamang',  waitTime: '2 hours ago',    priority: 'High',   requiredWard: 'Maternity',  tab: 'admin'     },
  { id: 'q5', patientName: 'Sara Khan',    waitTime: '30 minutes ago', priority: 'High',   requiredWard: 'Acute Ward', tab: 'discharge' },
  { id: 'q6', patientName: 'Tom Hardy',    waitTime: '45 minutes ago', priority: 'Medium', requiredWard: 'ICU',        tab: 'discharge' },
  { id: 'q7', patientName: 'Lisa Ray',     waitTime: '15 minutes ago', priority: 'Low',    requiredWard: 'Maternity',  tab: 'transfer'  },
  { id: 'q8', patientName: 'John Wick',    waitTime: '1 hour ago',     priority: 'High',   requiredWard: 'ICU',        tab: 'transfer'  },
];

export const WARDS = ['Acute Ward', 'ICU', 'Maternity', 'Isolation'];

export const BED_STATUSES = [
  { value: 'available',   label: 'Available'   },
  { value: 'occupied',    label: 'Occupied'    },
  { value: 'reserved',    label: 'Reserved'    },
  { value: 'discharging', label: 'Discharging' },
  { value: 'untidy',      label: 'Untidy'      },
  { value: 'faulty',      label: 'Faulty'      },
  { value: 'isolation',   label: 'Isolation'   },
];
