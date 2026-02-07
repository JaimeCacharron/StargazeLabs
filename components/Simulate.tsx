
import React, { useState } from 'react';
import { brainstormNewSignals } from '../services/geminiService';
import { SimulationResult, SignalObject, SignalType } from '../types';

const Simulate: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    const res = await brainstormNewSignals(topic);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-16 md:space-y-32 py-4 md:py-10 animate-in fade-in duration-1000 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-end">
        <div className="flex-1 space-y-8 md:space-y-12">
          <div className="relative">
            <h2 className="serif-font text-5xl md:text-8xl text-[#fcfcfc] mb-4 md:mb-6 lowercase tracking-tight leading-none">systemic probe</h2>
            <p className="text-[#fcfcfc]/60 text-sm md:text-base max-w-xl leading-relaxed font-light">
              Speculative scenario modeling. Initialize probe to visualize potential market trajectory.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="relative group max-w-2xl">
            <div className="flex flex-col gap-2">
              <label className="mono text-[8px] md:text-[9px] text-[#597983] uppercase tracking-[0.4em] font-black">Input Concept Vector</label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., algae-based meal replacements..."
                  className="w-full bg-transparent border-b border-white/50 px-0 py-4 md:py-6 text-xl md:text-3xl font-light text-[#fcfcfc] placeholder:text-[#597983]/80 focus:outline-none focus:border-[#fcfcfc] transition-all lowercase italic"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700"></div>
              </div>
            </div>
            <button
              disabled={loading}
              className="mt-8 flex items-center gap-3 py-3 md:py-4 px-8 md:px-12 bg-white text-[#172d3a] rounded-full mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-[#597983] hover:text-[#fcfcfc] transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-emerald-500/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-3 h-3 border border-[#172d3a]/30 border-t-[#172d3a] rounded-full animate-spin"></div>
                  Initializing...
                </>
              ) : 'Initialize Probe →'}
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 md:py-40 space-y-8 md:space-y-12 bg-black/10 rounded-[2rem] md:rounded-[3rem] border border-dashed border-white/10 animate-pulse">
          <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-white/5 border-t-white rounded-full animate-spin"></div>
          <p className="mono text-[9px] md:text-[11px] text-[#597983] uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-center px-6 leading-loose">
            Inferred Probabilities Calculating...<br/>
            Ingesting Speculative Vectors...
          </p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-20 md:space-y-40 animate-in slide-in-from-bottom-12 duration-1000">
          {/* Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-8 space-y-10 md:space-y-16">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#fcfcfc] animate-pulse"></div>
                  <span className="mono text-[9px] md:text-[11px] text-[#597983] uppercase font-black tracking-[0.3em] md:tracking-[0.4em]">Synthesis Detected</span>
                </div>
                <h3 className="serif-font text-4xl md:text-7xl text-[#fcfcfc] lowercase tracking-tight leading-none">
                  {topic}
                </h3>
                <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] italic">
                  <p className="text-lg md:text-2xl text-[#fcfcfc]/80 leading-relaxed font-light">
                    "{result.consumerDriver}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div className="glass border border-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#1a2f3b]/30">
                  <h4 className="mono text-[8px] md:text-[9px] text-[#597983] uppercase font-black tracking-[0.3em] mb-6 md:mb-8">Adjacent Forces</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.adjacentCategories.map((c, i) => (
                      <span key={i} className="text-[8px] md:text-[9px] font-bold text-[#fcfcfc]/60 border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-widest">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="glass border border-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-[#1a2f3b]/30">
                  <h4 className="mono text-[8px] md:text-[9px] text-[#597983] uppercase font-black tracking-[0.3em] mb-6 md:mb-8">Validation Metric</h4>
                  <p className="text-[11px] md:text-[12px] text-emerald-400 font-bold uppercase tracking-widest leading-relaxed">
                    {result.validationCriteria}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 shrink-0">
              <div className="glass border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 bg-white/5 space-y-6 md:space-y-10">
                <div className="flex flex-col gap-1 md:gap-2">
                   <span className="mono text-[9px] md:text-[10px] text-[#597983] uppercase font-black tracking-[0.3em]">Breakout Probablity</span>
                   <div className="text-7xl md:text-9xl font-black heading-font text-[#fcfcfc] tracking-tighter leading-none">
                     {result.speculativeConfidence === 'high' ? '82' : result.speculativeConfidence === 'medium' ? '54' : '21'}<span className="text-2xl md:text-4xl text-[#597983]">%</span>
                   </div>
                </div>
                <div className="pt-6 md:pt-8 border-t border-white/5">
                   <p className="text-[9px] mono text-rose-400/60 uppercase font-black tracking-[0.1em] md:tracking-[0.2em] leading-relaxed">
                     Hypothetical model output. Subject to noise.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Diffusion Path Section */}
          <div className="space-y-10 md:space-y-16">
            <div className="flex items-center gap-4 md:gap-8">
              <h4 className="mono text-[10px] md:text-[11px] text-[#597983] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black whitespace-nowrap">Diffusion Trajectory</h4>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 overflow-x-auto pb-10">
              {result.hypotheticalDiffusion.path.map((node, i) => (
                <div key={i} className="relative flex-1 min-w-[220px] md:min-w-[240px] group">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`w-2 h-2 rounded-full ${node.status === 'active' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}></div>
                    <span className="mono text-[8px] md:text-[9px] text-[#597983] uppercase font-black tracking-widest">Node {i + 1}</span>
                  </div>
                  <div className="glass border border-white/5 p-8 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] group-hover:bg-white/[0.06] transition-all bg-[#1a2f3b]/30">
                    <h5 className="text-xl md:text-2xl text-[#fcfcfc] lowercase font-medium mb-3 md:mb-4 tracking-tight leading-none">{node.label}</h5>
                    <div className="flex justify-between items-baseline pt-4 border-t border-white/5">
                      <span className="text-[8px] md:text-[9px] mono text-emerald-400 uppercase font-black tracking-widest">{node.status}</span>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#fcfcfc]/40 uppercase tracking-tighter">+{node.avg_lag_months}mo lag</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hypothetical Signals Section */}
          <div className="space-y-10 md:space-y-16">
             <div className="flex items-center gap-4 md:gap-8">
                <h4 className="mono text-[10px] md:text-[11px] text-[#597983] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black whitespace-nowrap">Inferred Indicators</h4>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {result.hypotheticalSignals.map((signal, i) => (
                <div key={i} className="glass border border-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] hover:bg-white/[0.06] transition-all bg-[#1a2f3b]/20 shadow-xl group">
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <span className="text-[8px] md:text-[9px] mono font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[#597983] uppercase tracking-widest">
                      {signal.signal_type}
                    </span>
                    <span className="text-emerald-400 font-bold mono text-[9px] md:text-[10px] uppercase tracking-tighter">↑ {signal.velocity}%</span>
                  </div>
                  <h5 className="text-xl md:text-2xl text-[#fcfcfc] lowercase font-medium mb-4 md:mb-6 leading-tight tracking-tight">
                    {signal.keyword_cluster}
                  </h5>
                  <p className="text-xs md:text-sm text-[#597983] leading-relaxed mb-8 md:mb-10 line-clamp-4 italic font-light opacity-80">
                    "{signal.raw_excerpt}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 md:pt-10 border-t border-white/5">
                    <span className="mono text-[8px] md:text-[9px] text-[#597983] uppercase font-black tracking-widest">Source Ingestion</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-[#fcfcfc]/40 uppercase truncate tracking-wider group-hover:text-[#fcfcfc]/70 transition-colors">{signal.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="glass border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-20 md:p-32 text-center bg-[#1a2f3b]/10 border-dashed">
           <div className="max-w-md mx-auto space-y-8 md:space-y-10 opacity-30">
             <div className="w-14 h-14 md:w-20 md:h-20 border border-[#597983] rounded-full mx-auto flex items-center justify-center text-[#597983] font-light text-2xl md:text-4xl">?</div>
             <p className="mono text-[9px] md:text-[11px] text-[#597983] uppercase font-black tracking-[0.3em] md:tracking-[0.5em] leading-loose">
               Protocol Engine Idle
             </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Simulate;
