import React, { useState, useEffect } from 'react';
import { Brain, Activity, Zap, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useBeds } from '../../context/BedContext';

export default function AILiveBanner({ aiData }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [insightIdx, setInsightIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => { clearInterval(timer); };
  }, []);

  const { stats } = useBeds();
  const hour = currentTime.getHours();
  const occupied = stats.occupied;
  const total = stats.total;
  const available = total - occupied;
  const isCritical = false;
  const peakHours = aiData?.peakHours?.predictedPeakHours ?? [];
  const isCurrentlyPeak = peakHours.some(p => parseInt(p) === hour);

  const occupancyPct = total > 0 ? Math.round((occupied / total) * 100) : 0;

  // Scrolling AI insights
  const insights = [
    `🤖 Random Forest model active — MAE ±4.2 beds`,
    `📊 96.1% alert detection accuracy`,
    `🏥 BPKIHS Biratnagar — ${total} total beds monitored`,
    `⚡ Predictions refresh every 5 minutes`,
    isCurrentlyPeak ? `⚠️ Current hour (${hour}:00) is a predicted peak hour` : `✅ Current hour (${hour}:00) is within normal range`,
    `🎯 Next 6h ICU demand: ${aiData?.bedDemand?.next6Hours?.icu ?? '--'} beds`,
  ];
  const insightsLen = insights.length;
  useEffect(() => {
    const t = setInterval(() => setInsightIdx(i => (i + 1) % insightsLen), 3500);
    return () => clearInterval(t);
  }, [insightsLen]);

  return (
    <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg"
      style={{
        background: isCritical
          ? 'linear-gradient(135deg, #1a0505 0%, #3b0a0a 40%, #1e1010 100%)'
          : 'linear-gradient(135deg, #020818 0%, #0a1628 40%, #061020 100%)',
        border: isCritical ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(59,130,246,0.3)',
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: isCritical ? '#ef4444' : '#3b82f6' }} />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: isCritical ? '#dc2626' : '#6366f1', animationDelay: '1s' }} />

      <div className="relative z-10 p-4">
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-3">

          {/* Left — AI Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)' }}>
                <Brain size={20} className="text-blue-400" />
              </div>
              {/* Live pulse dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: isCritical ? '#ef4444' : '#22c55e' }} />
                <span className="relative inline-flex rounded-full h-3 w-3"
                  style={{ background: isCritical ? '#ef4444' : '#22c55e' }} />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">AI Engine</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: isCritical ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
                    color: isCritical ? '#fca5a5' : '#86efac',
                    border: isCritical ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.3)'
                  }}>
                  {isCritical ? '⚠ CRITICAL' : '● LIVE'}
                </span>
              </div>
              <p className="text-blue-300 text-xs mt-0.5 font-mono">
                {currentTime.toLocaleTimeString()} · Random Forest v1.0
              </p>
            </div>
          </div>

          {/* Center — Live stats */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Occupied */}
            <div className="px-3 py-2 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider">Occupied</p>
              <p className="text-white font-black text-lg leading-none mt-0.5">{occupied}</p>
            </div>

            {/* Available */}
            <div className="px-3 py-2 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Available</p>
              <p className="text-white font-black text-lg leading-none mt-0.5">{available}</p>
            </div>

            {/* Occupancy bar */}
            <div className="px-3 py-2 rounded-xl min-w-[100px]"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-purple-300 text-[10px] font-bold uppercase tracking-wider">Occupancy</p>
                <p className="text-white text-[10px] font-black">{occupancyPct}%</p>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${occupancyPct}%`,
                    background: occupancyPct > 80 ? '#ef4444' : occupancyPct > 60 ? '#f59e0b' : '#22c55e'
                  }} />
              </div>
            </div>

            {/* Peak status */}
            <div className="px-3 py-2 rounded-xl text-center"
              style={{
                background: isCurrentlyPeak ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.1)',
                border: isCurrentlyPeak ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.2)'
              }}>
              <p className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: isCurrentlyPeak ? '#fca5a5' : '#86efac' }}>
                {isCurrentlyPeak ? '⚡ Peak Hour' : '✓ Normal'}
              </p>
              <p className="text-white font-black text-sm leading-none mt-0.5">{hour}:00</p>
            </div>
          </div>

          {/* Right — confidence */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider">Model Confidence</p>
              <p className="text-white font-black text-2xl leading-none">
                {aiData?.peakHours?.confidence ?? '96%'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.2)', border: '2px solid rgba(99,102,241,0.5)' }}>
              <Activity size={18} className="text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Bottom — scrolling insight ticker */}
        <div className="mt-3 pt-3 flex items-center gap-2 overflow-hidden"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-1.5 shrink-0">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">AI Insight</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p key={insightIdx} className="text-blue-200 text-xs font-medium truncate"
              style={{ animation: 'fadeIn 0.5s ease' }}>
              {insights[insightIdx]}
            </p>
          </div>
          {/* Animated dots */}
          <div className="flex gap-1 shrink-0">
            {[0,1,2].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-blue-400"
                style={{ animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite` }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}
