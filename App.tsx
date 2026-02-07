
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import TrendCard from './components/TrendCard';
import TrendDetail from './components/TrendDetail';
import Architecture from './components/Architecture';
import SignalCard from './components/SignalCard';
import Simulate from './components/Simulate';
import { TrendObject, TrendMaturity, SignalObject, AgeBracket, GenderProfile, calculateConfidenceScore } from './types';
import { INITIAL_TRENDS, INITIAL_SIGNALS, TIER_PATTERNS } from './constants';

const CadenceMetric: React.FC<{ label: string; value: string | number; color?: string; tooltip: string }> = ({ label, value, color = 'text-[#fcfcfc]', tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex flex-col gap-1 relative group min-w-[100px] md:min-w-[120px]">
      <div className="flex items-center gap-1.5">
        <span className="mono text-[8px] md:text-[9px] text-[#597983] uppercase font-bold tracking-[0.15em] whitespace-nowrap">{label}</span>
        <button 
          onMouseEnter={() => setShowTooltip(true)} 
          onMouseLeave={() => setShowTooltip(false)}
          className="w-3.5 h-3.5 rounded-full border border-[#597983]/30 flex items-center justify-center text-[7px] text-[#597983] hover:border-[#fcfcfc] hover:text-[#fcfcfc] transition-colors"
        >
          ?
        </button>
      </div>
      <span className={`text-2xl md:text-3xl font-bold ${color} heading-font tracking-tighter`}>{value}</span>
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-3 z-50 w-48 md:w-56 p-3 md:p-4 bg-[#1b3442] border border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 pointer-events-none">
          <p className="text-[9px] md:text-[10px] text-[#fcfcfc]/80 leading-relaxed font-bold uppercase tracking-wider mono">{tooltip}</p>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [trends] = useState<TrendObject[]>(INITIAL_TRENDS);
  const [signals] = useState<SignalObject[]>(INITIAL_SIGNALS);
  const [selectedTrend, setSelectedTrend] = useState<TrendObject | null>(null);
  
  // App Modes
  const [explainMode, setExplainMode] = useState(false);
  const [explainerDismissed, setExplainerDismissed] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  
  // Trend Filters
  const [filterAge, setFilterAge] = useState<AgeBracket | 'All'>('All');
  const [filterGender, setFilterGender] = useState<GenderProfile | 'All'>('All');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short'
    };
    setLastUpdate(now.toLocaleString('en-US', options));
  }, []);
  
  const weeklyCadenceStats = useMemo(() => {
    return {
      new_signals: signals.length,
      new_trends: 2,
      upgrades: 3,
      downgrades: 0
    };
  }, [signals.length]);

  const matchesFilters = (t: TrendObject) => {
    if (filterAge !== 'All' && t.demographic_profile.age_distribution[filterAge as AgeBracket] < 20) return false;
    if (filterGender !== 'All' && t.demographic_profile.gender_skew[filterGender as GenderProfile] < 30) return false;
    return true;
  };

  const sortedTrends = useMemo(() => {
    return [...trends].sort((a, b) => calculateConfidenceScore(b.confidenceMetrics) - calculateConfidenceScore(a.confidenceMetrics));
  }, [trends]);

  const sampleTrend: TrendObject = trends[0];

  const renderTrendSection = (maturity: TrendMaturity) => {
    const pattern = TIER_PATTERNS[maturity];
    const originalItemsInTier = sortedTrends.filter(t => t.maturity === maturity);
    const filteredItems = originalItemsInTier.filter(matchesFilters);
    
    let displayItems: (TrendObject & { isBackfill?: boolean })[] = filteredItems.slice(0, 10);
    const isSparse = displayItems.length < 5;

    if (isSparse) {
      const backfillCandidates = originalItemsInTier.filter(t => !matchesFilters(t));
      const needed = 5 - displayItems.length;
      const backfill = backfillCandidates.slice(0, needed).map(t => ({ ...t, isBackfill: true }));
      displayItems = [...displayItems, ...backfill];
    }
    
    if (displayItems.length === 0) return null;

    return (
      <div key={maturity} className="space-y-8 md:space-y-12">
        <div className="flex flex-col gap-6 md:gap-10 border-b border-white/5 pb-8 md:pb-12">
          <div className="flex items-center gap-4 md:gap-8">
            <h3 className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#fcfcfc]">{maturity}</h3>
            <span className="text-[10px] md:text-[12px] mono text-[#597983] uppercase tracking-wider font-bold">Density: {displayItems.length} Nodes</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8">
               <span className="block text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.3em] mb-3 md:mb-4 font-bold">Primary Drivers</span>
               <div className="flex flex-wrap gap-2">
                 {pattern.repeating_drivers.map((d, i) => (
                   <span key={i} className="text-[10px] md:text-[11px] font-bold text-[#fcfcfc]/80 border border-white/10 px-2.5 py-1 rounded uppercase tracking-wider">{d}</span>
                 ))}
               </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8">
               <span className="block text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.3em] mb-3 md:mb-4 font-bold">Product Formats</span>
               <p className="text-[13px] md:text-sm text-[#fcfcfc]/80 leading-relaxed font-normal">{pattern.format_convergence}</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8">
               <span className="block text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.3em] mb-3 md:mb-4 font-bold">Market Claims</span>
               <p className="text-[13px] md:text-sm text-[#fcfcfc]/80 leading-relaxed font-normal">{pattern.claim_convergence}</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8">
               <span className="block text-[10px] md:text-[11px] mono text-[#597983] uppercase tracking-[0.3em] mb-3 md:mb-4 font-bold">Mainstream Bridge</span>
               <p className="text-[13px] md:text-sm text-emerald-400/80 leading-relaxed font-normal mono uppercase tracking-tighter">{pattern.standardization_signals}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {displayItems.map(trend => (
            <div key={trend.id} className="relative">
              {trend.isBackfill && (
                <div className="absolute top-4 left-4 z-20 px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[8px] font-black uppercase tracking-widest pointer-events-none">
                  Low Match
                </div>
              )}
              <TrendCard 
                trend={trend} 
                onClick={setSelectedTrend} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-16 md:space-y-32 animate-in fade-in duration-1000 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
        {/* Left: Branding & Metrics */}
        <div className="flex-1 space-y-8 md:space-y-12">
          <div className="relative">
            {explainMode && (
              <div className="mb-6 md:mb-8 p-4 md:p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-500 max-w-lg">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <h4 className="text-[9px] md:text-[10px] mono text-emerald-400 font-black uppercase tracking-widest">Explain Mode Active</h4>
                </div>
                <p className="text-[11px] md:text-[12px] text-emerald-400/70 leading-relaxed font-bold uppercase tracking-wide">Protocol markers enabled.</p>
              </div>
            )}
            <h2 className="serif-font text-5xl md:text-8xl text-[#fcfcfc] mb-4 md:mb-6 lowercase tracking-tight leading-none">intelligence horizon</h2>
            <p className="text-[#fcfcfc]/60 text-sm md:text-base max-w-xl leading-relaxed font-light">
              Autonomous identification of concept drift from fringe to center. Confidence scores reflect probability of mass-market arrival.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 md:gap-12 pt-4">
            <CadenceMetric 
              label="New Signals" 
              value={`+${weeklyCadenceStats.new_signals}`} 
              tooltip="Raw data points captured from search, social, and retail feeds."
            />
            <CadenceMetric 
              label="New Trends" 
              value={`+${weeklyCadenceStats.new_trends}`} 
              tooltip="Distinct concept clusters formed from recurring signal groups."
            />
            <CadenceMetric 
              label="Upgrades" 
              value={weeklyCadenceStats.upgrades} 
              color="text-emerald-400"
              tooltip="Concepts showing high velocity breakout momentum."
            />
            <CadenceMetric 
              label="Downgrades" 
              value={weeklyCadenceStats.downgrades} 
              color="text-rose-400/30"
              tooltip="Signals decaying due to lack of cross-channel confirmation."
            />
          </div>
        </div>
        
        {/* Right: Refined Filter Console */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="glass border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 space-y-6 md:space-y-8 bg-[#1a2f3b]/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#597983]"></div>
              <h3 className="mono text-[9px] md:text-[10px] text-[#597983] uppercase tracking-[0.3em] font-black">Filter Console</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-3">
                <label className="mono text-[8px] md:text-[9px] text-[#597983] uppercase tracking-[0.2em] font-black flex justify-between">
                  Age Cohort
                </label>
                <div className="relative">
                  <select 
                    value={filterAge}
                    onChange={(e) => setFilterAge(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 md:px-6 md:py-4 mono text-[10px] md:text-[11px] text-[#fcfcfc] focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="All">ALL COHORTS</option>
                    {Object.values(AgeBracket).map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                  </select>
                  <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#597983] text-[9px]">▼</div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="mono text-[8px] md:text-[9px] text-[#597983] uppercase tracking-[0.2em] font-black flex justify-between">
                  Gender Profile
                </label>
                <div className="relative">
                  <select 
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 md:px-6 md:py-4 mono text-[10px] md:text-[11px] text-[#fcfcfc] focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="All">ALL GENDERS</option>
                    {Object.values(GenderProfile).map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
                  </select>
                  <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#597983] text-[9px]">▼</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-20 md:space-y-40">
        {explainMode && !explainerDismissed && (
          <div className="relative group/sample max-w-sm">
             <button 
                onClick={() => setExplainerDismissed(true)}
                className="absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full bg-[#172d3a] border border-white/20 text-[#fcfcfc] flex items-center justify-center hover:bg-rose-500 transition-colors"
                title="Dismiss Explainer"
             >
               ×
             </button>
             <TrendCard 
               trend={sampleTrend} 
               onClick={() => {}} 
               explainMode={true}
             />
          </div>
        )}

        {(Object.values(TrendMaturity)).map(m => renderTrendSection(m))}
      </div>
    </div>
  );

  const renderSignals = () => (
    <div className="space-y-16 md:space-y-32 animate-in fade-in duration-1000 px-4 md:px-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
        <div className="flex-1 space-y-8 md:space-y-12">
          <div className="relative">
            <h2 className="serif-font text-5xl md:text-8xl text-[#fcfcfc] mb-4 md:mb-6 lowercase tracking-tight leading-none">raw ingestion</h2>
            <p className="text-[#fcfcfc]/60 text-sm md:text-base max-w-xl leading-relaxed font-light">
              High-fidelity evidence stream monitoring 42+ global channels for concept mutation.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 md:gap-12 pt-4">
            <CadenceMetric 
              label="Live Nodes" 
              value={signals.length} 
              tooltip="Total active signal ingestion points."
            />
            <CadenceMetric 
              label="Novelty Index" 
              value="82%" 
              color="text-emerald-400"
              tooltip="Percentage of signals introducing new consumer language."
            />
            <CadenceMetric 
              label="Data Velocity" 
              value="1.2k/s" 
              tooltip="Real-time ingestion rate of raw evidence."
            />
          </div>
        </div>
      </div>

      <div className="glass border border-white/5 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#1a2f3b]/20">
        <div className="flex flex-col divide-y divide-white/5">
          {signals.map(signal => (
            <SignalCard key={signal.id} signal={signal} allTrends={trends} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      explainMode={explainMode}
      onToggleExplain={() => {
        setExplainMode(!explainMode);
        if (!explainMode) setExplainerDismissed(false);
      }}
      lastUpdate={lastUpdate}
    >
      {activeTab === 'Dashboard' && renderDashboard()}
      {activeTab === 'Signals' && renderSignals()}
      {activeTab === 'Architecture' && <Architecture />}
      {activeTab === 'Simulate' && <Simulate />}

      <TrendDetail 
        trend={selectedTrend} 
        onClose={() => setSelectedTrend(null)} 
      />
    </Layout>
  );
};

export default App;
