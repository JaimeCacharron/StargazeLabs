
import React, { useState, useEffect, useMemo } from 'react';
import { TrendObject, calculateConfidenceScore, AgeBracket, GenderProfile } from '../types';
import { getTrendIntelligence, generateOpportunityBrief } from '../services/geminiService';
import { parse } from 'marked';

interface TrendDetailProps {
  trend: TrendObject | null;
  onClose: () => void;
}

const TrendDetail: React.FC<TrendDetailProps> = ({ trend, onClose }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [briefContent, setBriefContent] = useState<string | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);

  useEffect(() => {
    if (trend) {
      setLoading(true);
      setAiAnalysis(null);
      setBriefContent(null);
      getTrendIntelligence(trend).then(res => {
        setAiAnalysis(res);
        setLoading(false);
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [trend]);

  const handleGenerateBrief = async () => {
    if (!trend || briefLoading) return;
    setBriefLoading(true);
    const brief = await generateOpportunityBrief(trend);
    setBriefContent(brief);
    setBriefLoading(false);
  };

  const renderedAnalysis = useMemo(() => {
    if (!aiAnalysis) return '';
    return parse(aiAnalysis);
  }, [aiAnalysis]);

  const renderedBrief = useMemo(() => {
    if (!briefContent) return '';
    return parse(briefContent);
  }, [briefContent]);

  if (!trend) return null;

  const confidenceScore = calculateConfidenceScore(trend.confidenceMetrics);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <div className="absolute inset-0 bg-[#172d3a]/98 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] overflow-hidden bg-[#172d3a] md:border md:border-white/10 md:rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
        {/* Left Column: Data & Specs */}
        <div className="flex-1 p-6 md:p-16 overflow-y-auto border-r border-white/5 custom-scrollbar">
          <button 
            onClick={onClose}
            className="mb-8 md:mb-12 text-[#597983] hover:text-[#fcfcfc] flex items-center gap-3 md:gap-4 text-[10px] uppercase tracking-[0.4em] mono font-bold transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Feed Return
          </button>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-6 md:mb-10">
             <span className="text-[9px] md:text-[11px] px-3 md:px-5 py-1 md:py-1.5 rounded-full border border-white/20 text-[#fcfcfc] bg-white/5 font-bold uppercase tracking-[0.2em] heading-font">
               {trend.category}
             </span>
             <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] mono text-[#597983] uppercase tracking-widest font-bold">Week over Week</span>
                <span className={`text-[11px] md:text-[12px] font-bold ${trend.weekly_activity.wow_change_pct > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {trend.weekly_activity.wow_change_pct > 0 ? '+' : ''}{trend.weekly_activity.wow_change_pct}% Signal Growth
                </span>
             </div>
          </div>

          <h2 className="serif-font text-4xl md:text-6xl font-normal text-[#fcfcfc] mb-8 md:mb-12 leading-tight lowercase tracking-tight">{trend.title}</h2>
          
          <div className="space-y-12 md:space-y-24">
            {/* Demographic Breakdown Section */}
            <section className="space-y-8 md:space-y-12">
              <div className="border-b border-white/5 pb-3 md:pb-4 mb-6 md:mb-8">
                <h4 className="text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold flex items-center gap-2 md:gap-3">
                  Inferred Audience Matrix
                </h4>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h5 className="text-[9px] md:text-[10px] mono text-[#597983] uppercase tracking-widest font-bold">Age Distribution</h5>
                  <div className="space-y-4">
                    {Object.entries(trend.demographic_profile.age_distribution).map(([age, pct]) => (
                      <div key={age} className="space-y-1.5 md:space-y-2">
                        <div className="flex justify-between text-[10px] md:text-[11px] font-bold text-[#fcfcfc] uppercase tracking-wide">
                          <span>{age}</span>
                          <span>{pct as number}%</span>
                        </div>
                        <div className="w-full h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${(pct as number) > 30 ? 'bg-[#fcfcfc]' : 'bg-[#597983]'}`} style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <h5 className="text-[9px] md:text-[10px] mono text-[#597983] uppercase tracking-widest font-bold">Gender Skew</h5>
                  <div className="space-y-4 md:space-y-6">
                    {Object.entries(trend.demographic_profile.gender_skew).map(([gender, pct]) => (
                      <div key={gender} className="flex items-center gap-4 md:gap-6">
                        <div className="w-20 md:w-24 text-[10px] md:text-[11px] font-bold text-[#fcfcfc] uppercase tracking-wide">{gender}</div>
                        <div className="flex-1 flex items-center gap-3 md:gap-4">
                           <div className="flex-1 h-2 md:h-3 bg-white/5 rounded-lg overflow-hidden">
                              <div className={`h-full ${(pct as number) > 50 ? 'bg-emerald-500/60' : 'bg-[#597983]'}`} style={{ width: `${pct}%` }}></div>
                           </div>
                           <span className="text-[11px] md:text-[12px] font-bold text-[#fcfcfc] w-8">{pct as number}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between mb-8 md:mb-10 border-b border-white/5 pb-4 md:pb-6">
                <div className="flex flex-col">
                  <h4 className="text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold">Confidence Protocol</h4>
                </div>
                <span className="text-3xl md:text-5xl font-bold text-[#fcfcfc] heading-font tracking-tight">{confidenceScore}%</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-12 bg-white/[0.02] p-6 md:p-10 rounded-xl md:rounded-2xl border border-white/5">
                {[
                  { label: 'Momentum', value: trend.confidenceMetrics.momentum },
                  { label: 'Breadth', value: trend.confidenceMetrics.breadth },
                  { label: 'Persistence', value: trend.confidenceMetrics.persistence },
                  { label: 'Novelty', value: trend.confidenceMetrics.novelty },
                  { label: 'Comm.', value: trend.confidenceMetrics.commercialization },
                  { label: 'Diffusion', value: trend.confidenceMetrics.geo_diffusion }
                ].map((m, i) => (
                  <div key={i} className="flex flex-col gap-2 md:gap-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[8px] md:text-[10px] mono uppercase tracking-widest text-[#fcfcfc]/80 font-bold">{m.label}</span>
                      <span className="text-[10px] md:text-[11px] mono font-bold text-[#fcfcfc]">{m.value}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#fcfcfc]" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="w-full md:w-[420px] lg:w-[480px] bg-black/10 p-6 md:p-16 flex flex-col overflow-y-auto custom-scrollbar border-t md:border-t-0 border-white/5">
          <div className="flex items-center gap-3 md:gap-5 mb-8 md:mb-12">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-[#fcfcfc] flex items-center justify-center">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#fcfcfc] rounded-full animate-ping"></div>
            </div>
            <h3 className="heading-font text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#fcfcfc]">Intelligence Synthesis</h3>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 md:py-20 space-y-6 md:space-y-8">
                <div className="w-8 h-8 md:w-10 md:h-10 border border-[#597983]/30 border-t-[#fcfcfc] rounded-full animate-spin"></div>
                <p className="text-[8px] md:text-[9px] text-[#597983] mono text-center tracking-[0.3em] font-bold uppercase">Synthesizing...</p>
              </div>
            ) : aiAnalysis ? (
              <div 
                className="prose text-xs md:text-sm leading-relaxed text-[#fcfcfc]/80"
                dangerouslySetInnerHTML={{ __html: renderedAnalysis as string }}
              />
            ) : (
              <p className="text-[10px] mono text-[#597983] uppercase tracking-widest text-center py-6">Synthesis unavailable.</p>
            )}

            {briefContent && (
              <div className="mt-12 pt-12 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-6 md:mb-10">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <h4 className="heading-font text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-emerald-400">Opportunity Brief</h4>
                </div>
                <div 
                  className="prose text-xs md:text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderedBrief as string }}
                />
              </div>
            )}
          </div>

          <div className="mt-10 pt-8 md:mt-16 md:pt-12 border-t border-white/10 shrink-0 pb-6 md:pb-0">
             <button 
                onClick={handleGenerateBrief}
                disabled={briefLoading || !aiAnalysis}
                className="w-full py-4 md:py-5 bg-[#fcfcfc] text-[#172d3a] hover:bg-emerald-500 hover:text-[#fcfcfc] disabled:bg-white/10 disabled:text-[#597983] rounded-xl font-black transition-all shadow-xl uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] heading-font flex items-center justify-center gap-2 md:gap-3"
             >
               {briefLoading ? 'Generating...' : 'Generate Opportunity Brief'}
             </button>
             <p className="text-[8px] mono text-[#597983] text-center mt-3 uppercase tracking-[0.1em] font-bold">
               Stargaze Intelligence Model v1.4
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendDetail;
