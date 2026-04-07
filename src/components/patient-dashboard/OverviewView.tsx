import React from "react";

export default function OverviewView() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.15)_0%,rgba(9,14,28,0)_70%)]"></div>

      {/* Header Section */}
      <section className="mb-12 relative">
        <h2 className="font-headline text-4xl text-on-surface font-bold tracking-tight mb-2">Hello, Alexander 👋</h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          System-wide neural monitoring for <span className="text-primary font-medium tracking-wide">ID: PX-9928-ALPHA</span>. Last scan synchronized 12 minutes ago.
        </p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Neural Stability Card (Primary Feature) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-high rounded-xl p-8 relative overflow-hidden group hover:bg-surface-variant transition-all duration-300">
          <div className="absolute top-0 right-0 p-8">
            <span className="material-symbols-outlined text-primary/20 text-[100px]">psychology</span>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Live Feed</p>
                <h3 className="font-headline text-2xl text-on-surface">Neural Stability</h3>
              </div>
              <div className="bg-surface-container-highest px-4 py-2 rounded-full border border-primary/10">
                <span className="text-primary-dim text-xs font-bold">OPTIMAL ZONE</span>
              </div>
            </div>
            <div className="flex items-end gap-6">
              <span className="text-[120px] leading-none font-headline font-bold text-on-surface tracking-tighter">
                98.2<span className="text-primary-dim text-[40px]">%</span>
              </span>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.4)] animate-pulse">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                </div>
              </div>
              <div className="mb-4 max-w-[200px]">
                <p className="text-on-surface-variant text-sm">Real-time synaptic coherence index is currently exceeding threshold baseline by +1.4%.</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/5 via-primary to-primary/5"></div>
        </div>

        {/* Recommended Actions (Secondary Focus) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.05)_0%,rgba(9,14,28,0)_70%)] pointer-events-none"></div>
            <h3 className="font-headline text-lg text-on-surface mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">clinical_notes</span>
              Clinical Tasks
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg group cursor-pointer hover:bg-surface-container-highest transition-colors border border-transparent hover:border-primary/20">
                <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">Review neural rhythm patterns</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Urgency: High • Due today</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg group cursor-pointer hover:bg-surface-container-highest transition-colors">
                <div className="w-1.5 h-10 bg-primary-dim rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">Calibrate cortical sensors</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Temporal lobe array alignment</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg group cursor-pointer hover:bg-surface-container-highest transition-colors">
                <div className="w-1.5 h-10 bg-outline-variant rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">Digital twin synchronization</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Scheduled for 16:00 UTC</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent History (Tertiary Feature) */}
        <div className="col-span-12 bg-surface-container-high rounded-xl p-8 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-headline text-xl text-on-surface">Recent Status History</h3>
            <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary-dim"></span> Stable</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-error"></span> Anomaly</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 relative">
            {/* Connector Line */}
            <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-outline-variant/20 z-0"></div>
            
            {/* Timeline Item 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-surface-container-highest border border-primary/30 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm z-10">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 w-full text-center hover:border-primary/20 transition-colors cursor-pointer">
                <p className="text-on-surface font-medium mb-1">Stable</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Oct 24 • 08:00</p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 bg-error/10 border border-error/40 rounded-full flex items-center justify-center mb-5 backdrop-blur-sm shadow-[0_0_20px_rgba(217,70,239,0.25)] z-10 -mt-1">
                <span className="material-symbols-outlined text-error">warning</span>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-error/20 w-full text-center relative overflow-hidden group hover:border-error/40 transition-colors cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.05)_0%,rgba(9,14,28,0)_70%)] pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                <p className="text-on-surface font-medium mb-1 relative z-10">Slight Anomaly</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1 relative z-10">Oct 23 • 21:15</p>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-surface-container-highest border border-primary/30 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm z-10">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 w-full text-center hover:border-primary/20 transition-colors cursor-pointer">
                <p className="text-on-surface font-medium mb-1">Stable</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Oct 22 • 14:30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Visual Data */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-6 flex items-center gap-6 group cursor-pointer hover:bg-surface-container-high hover:border-primary/20 border border-transparent transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest border-t-primary flex items-center justify-center transform group-hover:-rotate-90 transition-transform duration-700">
            <span className="text-primary text-sm font-bold group-hover:rotate-90 transition-transform duration-700">14%</span>
          </div>
          <div>
            <p className="text-on-surface font-medium mb-0.5">Memory Index</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">Cognitive retention drift within safe margins.</p>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-6 flex items-center gap-6 group cursor-pointer hover:bg-surface-container-high hover:border-primary/30 border border-transparent transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest border-r-tertiary flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 shadow-[0_0_10px_rgba(217,70,239,0.15)] group-hover:shadow-[0_0_20px_rgba(217,70,239,0.4)]">
            <span className="text-primary text-sm font-bold group-hover:-rotate-180 transition-transform duration-700">89%</span>
          </div>
          <div>
            <p className="text-on-surface font-medium mb-0.5">Motor Reflex</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">Signal velocity consistent with baseline.</p>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-6 flex items-center gap-6 group cursor-pointer hover:bg-surface-container-high hover:border-error/20 border border-transparent transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
          <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest border-l-error flex items-center justify-center transform group-hover:-rotate-180 transition-transform duration-700">
            <span className="text-error text-sm font-bold group-hover:rotate-180 transition-transform duration-700">0.4%</span>
          </div>
          <div>
            <p className="text-on-surface font-medium mb-0.5">Glial Load</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">Neuro-inflammation markers are undetectable.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
