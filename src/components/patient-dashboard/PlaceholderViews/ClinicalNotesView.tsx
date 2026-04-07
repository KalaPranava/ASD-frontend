import React, { useEffect, useState } from "react";

export default function ClinicalNotesView() {
  const [dynamicNotes, setDynamicNotes] = useState<any[]>([]);

  useEffect(() => {
    try {
      const existingStr = window.localStorage.getItem("neurolens_clinical_notes");
      if (existingStr) {
        setDynamicNotes(JSON.parse(existingStr));
      }
    } catch(e) {}
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] mt-4">
      

{/* Clinical Notes Canvas */}
<div className="pt-24 px-12 pb-20 max-w-7xl mx-auto">
{/* Page Header */}
<div className="flex items-end justify-between mb-12 relative">
{/* Ambient Glow Background */}
<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
<div>
<h2 className="text-5xl font-headline font-bold text-on-surface tracking-tighter mb-4">
                        Clinical <span className="text-primary">Notes</span>
</h2>
<p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
                        High-fidelity observation logs synchronized with neural mapping diagnostics for real-time patient status updates.
                    </p>
</div>

</div>
{/* Bento Grid of Notes */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Primary Insight Card (Asymmetric Focus) */}
<div className="md:col-span-2 lg:col-span-2 bg-surface-container-high rounded-lg p-8 relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all"></div>
<div className="flex items-start justify-between mb-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full border border-primary/30 p-1">
<img alt="Dr. Sarah Jenkins" className="w-full h-full rounded-full object-cover" data-alt="professional headshot of a female doctor in her 40s with a confident smile and medical attire, warm focused lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADTgQPB9jkWDNlOCzUjaxo4yOnX6ShQOLU_R3AYqsg1H2i481bS8ZRGJEduWpf4_ki3iKhBUAm91uqw9WHPbS2VCjCCfYfnT25oOBmZ5blMHf125Jdb4aFpYcmBUj3_gfooKJoQ75Evb9NfIvZ2sFukqqfkHaMf9miPy3aztiK0RcIHa15RoVX1VPVhqWNzplxHKOeGVezExN3SXdqFZVjjuKCkJKqZRFaeg4xLWBbW0dgrsB08NCzlvtdrCp9wGEBCyIxKEr53aBp"/>
</div>
<div>
<h4 className="font-bold text-on-surface text-lg">Dr. Sarah Jenkins</h4>
<p className="text-sm text-primary uppercase tracking-widest font-medium">Lead Neurologist</p>
</div>
</div>
<span className="text-sm text-outline font-medium px-4 py-1.5 bg-surface-container-lowest rounded-full">24 mins ago</span>
</div>
<div className="space-y-4">
<h3 className="text-2xl font-headline font-semibold text-on-surface tracking-tight">Anomalous alpha-wave resonance in Sector 7G</h3>
<p className="text-on-surface-variant leading-relaxed text-lg">
                            Patient 902 displays persistent rhythmic activity peaking at 12.4Hz. Unlike previous sessions, the synaptic firing pattern suggests a reactive response to external auditory stimuli, even under moderate sedation. Recommend immediate recalibration of the neural map to isolate localized sensory feedback.
                        </p>
</div>
<div className="mt-8 flex items-center gap-3">
<span className="px-3 py-1 bg-surface-container-highest text-primary text-xs font-bold rounded-full border border-primary/10">CRITICAL</span>
<span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs font-bold rounded-full">NEURO-SYNC</span>
</div>
</div>
{/* Dynamic Note Cards */}
{dynamicNotes.map((note, index) => {
  const noteDate = new Date(note.time);
  const timeStr = noteDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = noteDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return (
    <div key={`dyn-${index}`} className="bg-surface-container rounded-lg p-6 border-t border-primary/40 shadow-[0_0_15px_rgba(217,70,239,0.05)] hover:bg-surface-variant transition-colors group">
      <div className="flex justify-between items-start mb-6">
        <span className="text-xs text-outline font-medium">{dateStr}, {timeStr}</span>
        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_horiz</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-bold text-primary line-clamp-1">{note.doctor} (New)</h4>
      </div>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 whitespace-pre-wrap">
        {note.content}
      </p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(217,70,239,0.5)] animate-pulse"></span>
        <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Sync Complete</span>
      </div>
    </div>
  );
})}
{/* Secondary Note Cards */}
<div className="bg-surface-container rounded-lg p-6 border-t border-primary/5 hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-6">
<span className="text-xs text-outline font-medium">Today, 09:12 AM</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="more_horiz">more_horiz</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Dr. Marcus Vance</h4>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        Post-procedural check confirms cortical stability. Oxygenation levels at 98%. No visible tremors in the optic flow visualization.
                    </p>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-green-500"></span>
<span className="text-[10px] uppercase font-bold text-outline tracking-wider">Stable</span>
</div>
</div>
<div className="bg-surface-container rounded-lg p-6 border-t border-primary/5 hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-6">
<span className="text-xs text-outline font-medium">Yesterday, 04:45 PM</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="more_horiz">more_horiz</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Dr. Elena Rodriguez</h4>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        Research phase 3 initialization. Subject responsiveness to AI-guided motor therapy shows a 14% improvement in synaptic plasticity.
                    </p>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
<span className="text-[10px] uppercase font-bold text-outline tracking-wider">Research</span>
</div>
</div>
<div className="bg-surface-container rounded-lg p-6 border-t border-primary/5 hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-6">
<span className="text-xs text-outline font-medium">Oct 24, 11:20 AM</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="more_horiz">more_horiz</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Dr. Aris (PI)</h4>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        System health alert during last diagnostic. Slight latency in optics flow rendering. Need to check server node 04 for thermal throttling.
                    </p>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(255,113,108,0.5)]"></span>
<span className="text-[10px] uppercase font-bold text-outline tracking-wider">System Check</span>
</div>
</div>
{/* Long Form Card */}
<div className="md:col-span-2 bg-surface-container-low border border-outline-variant/10 rounded-lg p-8 flex flex-col md:flex-row gap-8 items-center">
<div className="w-full md:w-1/3 h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
<img alt="Brain Scan Detail" className="w-full h-full object-cover" data-alt="high-detail scientific visualization of a human brain scan with glowing turquoise neural pathways and deep black space background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPa1DlczTKXjXaoR-2TY7lMZ7Fz7XiQhzdVH9XyIskF-1y5nGMHMZYnWXabnmr81LlDK8IMNtK9oabpsgBtgly9uGRehs5ttsQr2pHbUMHRdLLUlxrZ5um5cS9LIHIHDwZ79B6ywWPMx0mmjI4WHycXnfds4yGYtJ2fhqO9YJp3LEGzo-BJjemvLLpJkYiVghSyqVbwvXpbkDhnwxn8MWFwC1YB_DT4HAWWyad4coJLfn4iaZX1oiF9oJ16CdCKA9xwFerX3V_qTSv"/>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-primary text-sm" data-icon="auto_awesome" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
<span className="text-[10px] font-bold text-primary tracking-widest uppercase">AI Clinical Summary</span>
</div>
<h4 className="text-xl font-headline font-bold text-on-surface mb-4">Cumulative Patient Trajectory</h4>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                            Based on the last 50 entries, the patient is entering a high-receptivity window for neuro-modulation. Clinical consensus suggests moving the next synchronization to 08:00 UTC to capitalize on peak circadian rhythm alignment.
                        </p>
<div className="flex gap-4">
<button className="text-xs font-bold text-on-primary-container bg-primary-container/20 px-4 py-2 rounded-full border border-primary/20 hover:bg-primary-container/40 transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">Apply Strategy</button>
<button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">Discard Draft</button>
</div>
</div>
</div>
{/* Quick Action Note */}
<div className="bg-gradient-to-br from-surface-container-highest to-surface-container rounded-lg p-6 flex flex-col justify-between border border-primary/5">
<div>
<span className="material-symbols-outlined text-primary/40 mb-4 scale-150" data-icon="history_edu">history_edu</span>
<h4 className="font-headline font-medium text-on-surface text-lg">Weekly Review</h4>
<p className="text-sm text-on-surface-variant mt-2">Generate the automated weekly clinical summary for the Research Board.</p>
</div>
<button className="mt-6 w-full py-3 bg-surface-bright rounded-xl text-primary font-bold text-xs uppercase tracking-tighter hover:bg-primary hover:text-on-primary transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">Compile Report</button>
</div>
</div>
</div>
{/* Footnote / Status */}
<footer className="mt-12 mb-20 px-12 flex items-center justify-between opacity-50">
<div className="flex items-center gap-4 text-xs font-medium">
<span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Network Active</span>
<span>Encrypted 256-bit</span>
<span>Node: US-EAST-01</span>
</div>
<p className="text-xs">NeuroLens © 2024 • Precision Neural Intelligence</p>
</footer>

    </div>
  );
}
