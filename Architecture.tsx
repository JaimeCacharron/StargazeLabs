
import React from 'react';

const Architecture: React.FC = () => {
  const sections = [
    {
      title: "I. Ingestion",
      subtitle: "Multi-Source Feed",
      items: ["Search Velocity Engine", "Semantic Forum Analysis", "Social Trend Diffusion", "Market Review Mutation", "Institutional Venture Flows"],
      color: "border-[#fcfcfc]/10"
    },
    {
      title: "II. Logic",
      subtitle: "Differential Filter",
      items: ["Momentum Logic (RoC)", "Cross-Channel Coherence", "Geospatial Clustering", "Novelty Decay Filter", "Force Adjacency Context"],
      color: "border-[#fcfcfc]/20"
    },
    {
      title: "III. Synthesis",
      subtitle: "Intelligence Synthesis",
      items: ["Pattern Recognition (Gemini)", "Founder Playbook Modeling", "Micro-Trend Taxonomy", "Driver-Pattern Extraction"],
      color: "border-[#fcfcfc]/30"
    },
    {
      title: "IV. Deployment",
      subtitle: "Decision Support",
      items: ["Strategic Dashboard", "Signal Alerts (Instant)", "Weekly Intelligence Loop", "Custom Founder Briefs"],
      color: "border-[#fcfcfc]/40"
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32 py-4 md:py-10 animate-in fade-in duration-1000 px-4 md:px-0">
      <div className="max-w-4xl space-y-8 md:space-y-12">
        <div className="relative">
          <h2 className="serif-font text-5xl md:text-8xl text-[#fcfcfc] mb-4 md:mb-6 lowercase tracking-tight leading-none">system logic</h2>
          <p className="text-[#fcfcfc]/60 text-sm md:text-base max-w-xl leading-relaxed font-light">
            Autonomous data processing logic designed to identify high-potential signals before they breakout.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {sections.map((s, i) => (
          <div key={i} className={`group glass border border-white/5 p-8 md:p-12 flex flex-col hover:bg-white/[0.04] transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] bg-[#1a2f3b]/30`}>
            <div className="mb-6 md:mb-10">
              <h3 className="text-[#597983] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[9px] mono mb-3 md:mb-4">{s.title}</h3>
              <p className="text-2xl md:text-3xl font-medium text-[#fcfcfc] lowercase tracking-tight leading-none">{s.subtitle}</p>
            </div>
            <ul className="space-y-4 md:space-y-6 flex-1">
              {s.items.map((item, idx) => (
                <li key={idx} className="text-[9px] md:text-[10px] text-[#597983] font-bold uppercase tracking-widest flex items-start gap-3 md:gap-4 leading-tight">
                  <span className="mt-1 w-1 h-1 bg-[#fcfcfc]/40 rounded-full flex-shrink-0 group-hover:bg-[#fcfcfc] transition-all"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 relative overflow-hidden group bg-[#1a2f3b]/10">
        <div className="hidden sm:block absolute top-0 right-0 p-8 md:p-12">
            <span className="text-[9px] md:text-[10px] mono text-[#fcfcfc]/60 bg-white/5 px-4 md:px-5 py-1.5 md:py-2 border border-white/10 rounded-full font-bold uppercase tracking-widest">Protocol Vantage</span>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-xl md:text-2xl text-[#fcfcfc] lowercase tracking-tight font-medium">Internal Pulse</h4>
            <p className="text-[9px] md:text-[10px] text-[#597983] leading-relaxed font-bold uppercase tracking-[0.2em]">intelligence continuity protocol.</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-xl md:text-2xl text-[#fcfcfc] lowercase tracking-tight font-medium">Trajectory</h4>
            <p className="text-[9px] md:text-[10px] text-[#597983] leading-relaxed font-bold uppercase tracking-[0.2em]">Diffusion mapping of movement.</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-xl md:text-2xl text-[#fcfcfc] lowercase tracking-tight font-medium">Projection</h4>
            <p className="text-[9px] md:text-[10px] text-[#597983] leading-relaxed font-bold uppercase tracking-[0.2em]">Statistical forces projecting high-confidence signals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
