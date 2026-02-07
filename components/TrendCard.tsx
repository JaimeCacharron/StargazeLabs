
import React, { useMemo } from 'react';
import { TrendObject, TrendMaturity, calculateConfidenceScore, AccelerationCurve } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface TrendCardProps {
  trend: TrendObject;
  onClick: (trend: TrendObject) => void;
  explainMode?: boolean;
}

const TrendCard: React.FC<TrendCardProps> = ({ trend, onClick, explainMode = false }) => {
  const getMaturityStyles = (m: TrendMaturity) => {
    switch(m) {
      case TrendMaturity.WEAK_SIGNAL: return 'bg-[#597983]/10 text-[#597983] border-[#597983]/30';
      case TrendMaturity.PRE_BREAKOUT: return 'bg-white/10 text-white border-white/20';
      case TrendMaturity.EARLY_MAINSTREAM: return 'bg-amber-400/10 text-amber-400 border-amber-400/30';
    }
  };

  const momentumData = useMemo(() => {
    switch (trend.acceleration_curve) {
      case AccelerationCurve.ACCELERATING:
        return [5, 12, 28, 55, 95].map(v => ({ val: v + Math.random() * 2 }));
      case AccelerationCurve.PEAKING:
        return [40, 75, 98, 85, 65].map(v => ({ val: v + Math.random() * 2 }));
      case AccelerationCurve.FLAT:
      default:
        return [45, 47, 44, 46, 45].map(v => ({ val: v + Math.random() * 2 }));
    }
  }, [trend.acceleration_curve]);

  const confidenceScore = calculateConfidenceScore(trend.confidenceMetrics);

  const Marker = ({ num }: { num: number }) => (
    <div className="inline-flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[8px] md:text-[9px] font-black text-emerald-400 mono">
      {num}
    </div>
  );

  return (
    <div 
      onClick={() => onClick(trend)}
      className={`group glass border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-9 cursor-pointer hover:border-white/30 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full relative overflow-hidden ${explainMode ? 'ring-2 ring-emerald-500/20 bg-emerald-500/[0.02]' : ''}`}
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={momentumData}>
            <Area type="monotone" dataKey="val" stroke="none" fill="#fcfcfc" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4 mb-4 md:mb-6">
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center gap-1.5">
              <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-widest border self-start ${getMaturityStyles(trend.maturity)}`}>
                {explainMode ? 'Maturity' : trend.maturity}
              </span>
              {explainMode && <Marker num={1} />}
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <div className="flex items-center gap-1.5">
              {explainMode && <Marker num={2} />}
              <span className="text-[8px] md:text-[10px] mono text-[#597983] uppercase tracking-widest font-bold">
                {explainMode ? 'Conf' : 'Confidence'}
              </span>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-[#fcfcfc] heading-font tracking-tight leading-none">
              {explainMode ? 'Likely' : `${confidenceScore}%`}
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex items-center gap-2 mb-3 md:mb-4 group-hover:translate-x-1 transition-transform">
          <h3 className="text-xl md:text-3xl font-medium text-[#fcfcfc] lowercase tracking-tight leading-tight">
            {explainMode ? 'Trend name' : trend.title}
          </h3>
          {explainMode && <Marker num={3} />}
        </div>

        {/* Drivers Section */}
        <div className="flex flex-wrap gap-1.5 mb-4">
           <div className="flex flex-wrap items-center gap-1.5">
             <span className="text-[9px] md:text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[#fcfcfc]/60 uppercase tracking-widest">
               {explainMode ? 'Driver 1' : trend.primaryDriver}
             </span>
             <span className="text-[9px] md:text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[#fcfcfc]/40 uppercase tracking-widest">
               {explainMode ? 'Driver 2' : trend.secondaryDriver}
             </span>
             {explainMode && <Marker num={4} />}
           </div>
        </div>
        
        {/* Signals Counter Section */}
        <div className="flex items-center gap-6 mb-4 md:mb-6">
           <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] md:text-[10px] mono text-[#597983] uppercase font-bold tracking-widest">
                  {explainMode ? 'Signals' : 'Signals (7d)'}
                </span>
                {explainMode && <Marker num={5} />}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base md:text-lg font-bold text-[#fcfcfc]">
                  {explainMode ? 'Velocity' : trend.weekly_activity.signals_7d}
                </span>
                {!explainMode && (
                  <span className={`text-[9px] font-black ${trend.weekly_activity.wow_change_pct > 0 ? 'text-emerald-400' : 'text-rose-400/60'}`}>
                    {trend.weekly_activity.wow_change_pct > 0 ? '+' : ''}{trend.weekly_activity.wow_change_pct}%
                  </span>
                )}
              </div>
           </div>
        </div>

        {/* Description Section */}
        <p className="text-xs md:text-sm text-[#597983] mb-6 md:mb-8 line-clamp-2 leading-relaxed font-normal">
          {explainMode ? 'Intelligence summary.' : trend.definition}
        </p>

        {/* Metadata Compact Row */}
        <div className="flex items-center gap-0 bg-[#172d3a] rounded-lg md:rounded-xl overflow-hidden border border-white/10 mt-auto divide-x divide-white/10 relative">
          <div className="flex-1 px-3 py-2 md:px-5 md:py-4">
            <span className="block text-[8px] md:text-[10px] mono text-[#597983] uppercase font-bold tracking-widest mb-0.5">Horizon</span>
            <span className="text-[10px] md:text-[11px] font-bold text-[#fcfcfc] uppercase tracking-wider truncate">
              {explainMode ? 'Time' : trend.time_to_mainstream_estimate}
            </span>
          </div>
          <div className="flex-1 px-3 py-2 md:px-5 md:py-4">
            <span className="block text-[8px] md:text-[10px] mono text-[#597983] uppercase font-bold tracking-widest mb-0.5">Origin</span>
            <span className="text-[10px] md:text-[11px] font-bold text-[#fcfcfc] uppercase tracking-wider truncate">
              {explainMode ? 'Node' : trend.diffusion_profile.origin_region}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
