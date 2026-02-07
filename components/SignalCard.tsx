
import React, { useState } from 'react';
import { SignalObject, SignalType, TrendObject } from '../types';

interface SignalCardProps {
  signal: SignalObject;
  allTrends: TrendObject[];
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, allTrends }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVelocityIcon = (velocity: number) => {
    if (velocity > 85) return <span className="text-emerald-400">↑</span>;
    if (velocity < 40) return <span className="text-rose-400">↓</span>;
    return <span className="text-[#597983]">→</span>;
  };

  const isNewLanguage = signal.novelty_score > 80;
  const linkedTrends = allTrends.filter(t => signal.linked_trends.includes(t.id));

  return (
    <div 
      className={`border-b border-white/5 hover:bg-white/[0.01] transition-colors overflow-hidden ${isExpanded ? 'bg-white/[0.03]' : ''}`}
    >
      <div 
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 md:px-10 py-6 md:py-8 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 md:min-w-[240px]">
          <span className="mono text-[10px] md:text-[12px] text-[#597983] md:w-28 font-bold uppercase">
            {new Date(signal.detected_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className={`text-[10px] md:text-[12px] font-bold uppercase tracking-widest px-3 md:px-4 py-1 md:py-1.5 rounded border border-white/10 bg-black/20 w-20 md:w-24 text-center ${signal.signal_type === SignalType.FUNDING ? 'text-violet-400 border-violet-500/20' : 'text-[#fcfcfc]'}`}>
            {signal.signal_type}
          </span>
        </div>

        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-5 md:min-w-[280px]">
            <span className="mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-tighter font-bold md:block hidden">[{signal.geo_origin}]</span>
            <span className="text-sm md:text-base text-[#fcfcfc] font-medium lowercase tracking-tight">
              {signal.keyword_cluster}
            </span>
            <span className="mono text-[9px] text-[#597983] uppercase tracking-tighter font-bold md:hidden">Region: {signal.geo_origin}</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-[9px] md:text-[11px] font-bold text-[#597983] uppercase tracking-widest">Cohort:</span>
            <span className="text-[10px] md:text-[12px] font-bold text-[#fcfcfc]/80 uppercase tracking-widest">{signal.demographics.dominant_age.split(' ')[0]}</span>
            <span className="text-[10px] md:text-[12px] font-bold text-[#fcfcfc]/80 uppercase tracking-widest">/</span>
            <span className="text-[10px] md:text-[12px] font-bold text-[#fcfcfc]/80 uppercase tracking-widest">{signal.demographics.dominant_gender}</span>
          </div>

          <div className="flex items-center justify-between lg:flex lg:items-center lg:gap-10 lg:ml-auto">
            <div className="flex items-center gap-3 md:gap-4">
              <span className="mono text-[10px] md:text-[12px] text-[#597983] uppercase font-bold tracking-widest">Velocity</span>
              <span className="mono text-[11px] md:text-[13px] font-bold text-[#fcfcfc] flex items-center gap-1.5">
                {signal.velocity}% {getVelocityIcon(signal.velocity)}
              </span>
            </div>
            {isNewLanguage && (
              <span className="text-[8px] md:text-[10px] font-black tracking-widest px-3 md:px-4 py-0.5 md:py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded uppercase ml-2">Novelty</span>
            )}
          </div>
        </div>

        <div className="ml-auto md:ml-0 mono text-[10px] md:text-[12px] text-[#fcfcfc] font-bold uppercase tracking-widest p-2 bg-white/5 rounded-lg md:bg-transparent">
          {isExpanded ? 'Collapse' : 'Inspect'}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 md:px-10 pb-12 md:pb-16 pt-4 md:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 animate-in slide-in-from-top-2 duration-300">
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            <div>
              <h5 className="mono text-[10px] md:text-[12px] text-[#597983] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 font-bold">Verbatim Excerpt</h5>
              <div className="bg-black/30 border border-white/10 p-6 md:p-10 rounded-xl md:rounded-2xl">
                <p className="text-sm md:text-base text-[#fcfcfc]/90 leading-relaxed md:leading-loose font-normal italic">
                  "{signal.raw_excerpt}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 bg-white/[0.02] p-6 md:p-10 rounded-xl md:rounded-2xl border border-white/5">
               <div className="space-y-1">
                 <span className="block mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-widest font-bold">Node</span>
                 <span className="text-[11px] md:text-[13px] font-bold text-[#fcfcfc] uppercase">{signal.source}</span>
               </div>
               <div className="space-y-1">
                 <span className="block mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-widest font-bold">Novelty</span>
                 <span className="text-[11px] md:text-[13px] font-bold text-[#fcfcfc]">{signal.novelty_score}%</span>
               </div>
               <div className="space-y-1">
                 <span className="block mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-widest font-bold">Conf.</span>
                 <span className="text-[11px] md:text-[13px] font-bold text-[#fcfcfc] uppercase">{signal.confidence}</span>
               </div>
               <div className="space-y-1">
                 <span className="block mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-widest font-bold">Signal ID</span>
                 <span className="text-[11px] md:text-[13px] font-bold text-[#fcfcfc] mono uppercase">_{signal.id.split('-').pop()}</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-12 space-y-6 md:space-y-10">
            <h5 className="mono text-[10px] md:text-[12px] text-[#597983] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">System Mapping</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {linkedTrends.length > 0 ? linkedTrends.map(trend => (
                <div key={trend.id} className="flex flex-col p-4 md:p-6 bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl hover:border-white/30 transition-colors">
                  <span className="text-[11px] md:text-[13px] font-bold text-[#fcfcfc] mb-1.5 md:mb-3 uppercase tracking-wide">{trend.title}</span>
                  <span className="text-[9px] md:text-[11px] text-[#597983] uppercase tracking-widest font-bold mono">{trend.maturity}</span>
                </div>
              )) : (
                <div className="py-8 text-center border border-dashed border-white/10 rounded-xl">
                  <span className="text-[10px] mono text-[#597983] uppercase font-bold tracking-widest">No active intersects</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalCard;
