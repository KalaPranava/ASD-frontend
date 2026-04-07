import React from "react";

export default function PatientHistoryView() {
  return (
    <div className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] mt-4">
      

<div className="pt-24 pb-12 px-12 synaptic-glow">
{/* Header Section */}
<div className="mb-12 flex justify-between items-end">
<div className="space-y-2">
<div className="flex items-center gap-3 mb-2">
<span className="px-3 py-1 bg-primary-container/10 text-primary-fixed text-[10px] font-bold tracking-widest rounded-full uppercase">Clinical Record #NX-882</span>
<span className="flex items-center gap-1 text-on-surface-variant text-[10px] uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Synchronized</span>
</div>
<h2 className="text-5xl font-headline font-bold tracking-tighter text-on-surface">Patient <span className="text-primary">History</span></h2>
<p className="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed">A comprehensive synaptic longitudinal study tracking seizure density, pharmacological adjustments, and diagnostic interventions.</p>
</div>
<div className="flex gap-4">
<div className="bg-surface-container-high rounded-lg p-4 flex items-center gap-4 border border-outline-variant/10 shadow-lg">
<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="calendar_month">calendar_month</span>
</div>
<div>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Observation Period</p>
<p className="text-on-surface font-headline font-bold">18 Months</p>
</div>
</div>
</div>
</div>
{/* Main Timeline Content */}
<div className="grid grid-cols-12 gap-8">
{/* Summary Column */}
<div className="col-span-12 lg:col-span-3 space-y-6">
<div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10">
<h3 className="text-sm font-headline font-bold text-on-surface mb-4 uppercase tracking-wider">Patient Meta</h3>
<div className="space-y-4">
<div>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Diagnosis</p>
<p className="text-on-surface text-sm font-medium">Refractory Temporal Lobe Epilepsy</p>
</div>
<div>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Active Meds</p>
<div className="flex flex-wrap gap-2 mt-1">
<span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-primary">Levetiracetam</span>
<span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-primary">Lacosamide</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10 relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
<h3 className="text-sm font-headline font-bold text-on-surface mb-4 uppercase tracking-wider">Neural Health Score</h3>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-headline font-bold text-primary">82</span>
<span className="text-on-surface-variant text-sm">/ 100</span>
</div>
<div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-4">
<div className="bg-primary h-full rounded-full" style={{"width":"82%"}}></div>
</div>
<p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed">Synaptic stability increased by 14% following last medication adjustment.</p>
</div>
</div>
{/* Vertical Timeline Column */}
<div className="col-span-12 lg:col-span-9 relative">
{/* Vertical Line */}
<div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-outline-variant/20 to-transparent"></div>
<div className="space-y-12">
{/* Date Marker */}
<div className="relative z-10 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-surface-container-high border border-primary/20 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(217,70,239,0.1)]">
<span className="material-symbols-outlined" data-icon="event">event</span>
</div>
<span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-1.5 rounded-full">October 2023</span>
</div>
{/* Timeline Item: Seizure Episode */}
<div className="relative pl-16 group">
{/* Connection Node */}
<div className="absolute left-5 top-8 w-2 h-2 rounded-full bg-error border border-error/50 shadow-[0_0_10px_rgba(255,113,108,0.5)] z-20"></div>
<div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/10 group-hover:bg-surface-variant transition-colors duration-300 shadow-xl">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center">
<span className="material-symbols-outlined text-error" data-icon="warning">warning</span>
</div>
<div>
<h4 className="text-on-surface font-headline font-bold">Acute Seizure Episode</h4>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Oct 14, 2023 • 03:42 AM</p>
</div>
</div>
<span className="px-2 py-1 bg-error/10 text-error text-[10px] rounded font-bold uppercase tracking-widest">Critical Intensity</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="col-span-2">
<p className="text-on-surface-variant text-sm leading-relaxed">Grand mal event recorded via neural implant. Duration: 124 seconds. Secondary generalization noted in pre-frontal cortex. Post-ictal recovery lasted 45 minutes.</p>
</div>
<div className="bg-[#0d1323] rounded p-3 flex items-center justify-center aspect-video relative overflow-hidden">
<img className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all" data-alt="abstract digital brain wave pattern displaying high frequency oscillations in bright cyan and red" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVzN5pgo4W5K7ff6UtJHVKkRtjzeKXK29Os9_pig8N6KtKpqtMT576yWwb1ccBdTPDdqKPToa2G3b3feFUaJXQv6nUwRdjnQ_i2vs9LJmANhfpstI1MOyMRTtO9wbS5y7dG6V_z5RdqiBSecTxxV4WCz46sb9EcY8o19lyO8K9vCU9rAdlxKTU8AjiPZ-mc_QbrLN1qpRWmqcoWoi3graAAdjT0_r33oeciEtN_XHRwWjGNi1bMKNL1CW29ZqY92HH43D43mqTQU0p"/>
<span className="text-[10px] relative z-10 font-bold text-[#e1e4fa] bg-[#090e1c]/80 px-2 py-1 rounded">View EEG Spike</span>
</div>
</div>
</div>
</div>
{/* Date Marker */}
<div className="relative z-10 flex items-center gap-4 pt-4">
<div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="event">event</span>
</div>
<span className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">September 2023</span>
</div>
{/* Timeline Item: Medication Change */}
<div className="relative pl-16 group">
<div className="absolute left-5 top-8 w-2 h-2 rounded-full bg-primary border border-primary/50 shadow-[0_0_10px_rgba(217,70,239,0.5)] z-20"></div>
<div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/10 group-hover:bg-surface-variant transition-colors duration-300">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="medication">medication</span>
</div>
<div>
<h4 className="text-on-surface font-headline font-bold">Pharmacological Adjustment</h4>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Sep 28, 2023 • 10:15 AM</p>
</div>
</div>
<span className="px-2 py-1 bg-primary/10 text-primary text-[10px] rounded font-bold uppercase tracking-widest">Protocol Delta</span>
</div>
<p className="text-on-surface-variant text-sm leading-relaxed mb-4">Dosage of <span className="text-on-surface font-medium">Levetiracetam</span> increased from 500mg to 750mg BID. Goal is to mitigate cluster events observed during previous cycle.</p>
<div className="flex items-center gap-4 bg-surface-container-lowest/50 p-4 rounded-lg">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-on-tertiary border-2 border-surface">500</div>
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-on-primary border-2 border-surface">750</div>
</div>
<p className="text-[10px] text-on-surface-variant italic">Dosage escalation strategy active.</p>
</div>
</div>
</div>
{/* Timeline Item: Appointment */}
<div className="relative pl-16 group">
<div className="absolute left-5 top-8 w-2 h-2 rounded-full bg-primary border border-primary/50 shadow-[0_0_10px_rgba(217,70,239,0.5)] z-20"></div>
<div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/10 group-hover:bg-surface-variant transition-colors duration-300">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="medical_services">medical_services</span>
</div>
<div>
<h4 className="text-on-surface font-headline font-bold">Clinical Review: Dr. Sarah Vance</h4>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Sep 12, 2023 • 01:00 PM</p>
</div>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
<span className="text-[10px] text-primary font-bold uppercase tracking-widest">Completed</span>
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest rounded p-3 border border-outline-variant/5">
<p className="text-[9px] text-on-surface-variant uppercase tracking-tighter mb-1 font-bold">Clinical Notes</p>
<p className="text-xs text-on-surface leading-snug">Patient reported improved sleep quality. Motor functions stable. Recommended follow-up MRI in Q4.</p>
</div>
<div className="bg-surface-container-lowest rounded p-3 border border-outline-variant/5">
<p className="text-[9px] text-on-surface-variant uppercase tracking-tighter mb-1 font-bold">Action Items</p>
<ul className="text-xs text-on-surface list-disc pl-3 space-y-1">
<li>Schedule Neural MRI</li>
<li>Bloodwork: Liver function</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Footer Section */}
<footer className="mt-12 py-8 px-12 border-t border-outline-variant/10 flex items-center justify-between text-on-surface-variant">
<div className="flex items-center gap-6">
<p className="text-xs tracking-widest uppercase">System Protocol v4.2.1</p>
<p className="text-xs tracking-widest uppercase border-l border-outline-variant/20 pl-6">NeuroLens Analytics Engine</p>
</div>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 text-xs font-bold text-on-surface hover:text-primary transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">
<span className="material-symbols-outlined text-sm" data-icon="file_download">file_download</span>
                    EXPORT LOGS
                </button>
<button className="flex items-center gap-2 text-xs font-bold text-on-surface hover:text-primary transition-colors hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">
<span className="material-symbols-outlined text-sm" data-icon="print">print</span>
                    REPORT PREVIEW
                </button>
</div>
</footer>

    </div>
  );
}
