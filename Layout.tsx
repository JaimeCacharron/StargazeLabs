
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  explainMode?: boolean;
  onToggleExplain?: () => void;
  lastUpdate?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  explainMode = false, 
  onToggleExplain,
  lastUpdate = "May 22, 16:45 GMT"
}) => {
  const [showUpdateTooltip, setShowUpdateTooltip] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-white/20">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#172d3a]/80 backdrop-blur-xl sticky top-0 z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-2">
          {/* Logo Section */}
          <div className="flex items-center gap-1.5 md:gap-2.5 group cursor-pointer shrink-0" onClick={() => onTabChange('Dashboard')}>
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className="serif-font text-xl md:text-2xl lg:text-3xl font-normal text-[#fcfcfc] lowercase tracking-tight whitespace-nowrap">
                stargaze
              </span>
              <span className="heading-font text-[9px] md:text-[11px] lg:text-[13px] font-normal tracking-[0.25em] md:tracking-[0.35em] text-[#fcfcfc] uppercase whitespace-nowrap">
                ventures
              </span>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center gap-0.5 bg-black/20 p-1 rounded-full border border-white/5 overflow-x-auto no-scrollbar shrink-0 mx-2">
            {['Dashboard', 'Signals', 'Simulate', 'Architecture'].map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-2.5 md:px-4 py-1.5 rounded-full text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-[#fcfcfc] text-[#172d3a] shadow-lg' 
                    : 'text-[#fcfcfc]/50 hover:text-[#fcfcfc] hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Controls & Status */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Global Explain Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 md:px-3 py-1 md:py-1.5 h-8 md:h-9">
              <span className="mono text-[8px] md:text-[9px] text-[#597983] uppercase tracking-widest font-black hidden lg:inline">Explain</span>
              <button 
                onClick={onToggleExplain}
                className={`w-7 h-3.5 md:w-8 md:h-4 rounded-full relative transition-all duration-300 ${explainMode ? 'bg-emerald-500' : 'bg-white/10'}`}
                aria-label="Toggle Explain Mode"
              >
                <div className={`absolute top-0.5 left-0.5 w-2.5 md:w-3 md:h-3 h-2.5 bg-white rounded-full transition-transform duration-300 ${explainMode ? 'translate-x-3.5 md:translate-x-4' : ''}`} />
              </button>
            </div>

            <div 
              className="hidden sm:flex flex-col items-end border-r border-white/10 pr-4 relative cursor-help"
            >
              <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#fcfcfc] mono uppercase">Last Update</span>
              <span className="text-[8px] md:text-[9px] text-[#597983] mono uppercase whitespace-nowrap">{lastUpdate}</span>
            </div>
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#fcfcfc] shadow-[0_0_10px_rgba(252,252,252,0.6)] animate-pulse shrink-0"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 md:py-16 px-4 md:px-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 md:py-20 bg-[#172d3a]">
        <div className="max-w-7xl mx-auto px-6 md:px-4 flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-baseline gap-3">
               <h2 className="serif-font text-xl md:text-2xl text-[#fcfcfc] lowercase">stargaze</h2>
               <span className="heading-font text-[10px] md:text-[12px] font-normal tracking-[0.4em] text-[#fcfcfc] uppercase">ventures</span>
            </div>
            <p className="text-[#597983] text-[10px] md:text-[12px] max-w-xs leading-relaxed uppercase tracking-wider font-bold">
              Autonomous trend detection and intelligence protocol.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 text-[#597983] text-[9px] md:text-[11px] font-bold uppercase tracking-[0.25em] mono">
            <a href="#" className="hover:text-[#fcfcfc] transition-colors">Strategic Intelligence</a>
            <a href="#" className="hover:text-[#fcfcfc] transition-colors">Access Logic</a>
            <a href="#" className="hover:text-[#fcfcfc] transition-colors">System v1.4</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
