"use client";

import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      
<Navbar />
{/* Hero Section */}
<section className="relative pt-40 pb-20 overflow-hidden">
{/* Base UI layer (Background patterns & Glows) */}
<div className="glow-leak absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"></div>
<div className="glow-leak absolute top-1/2 -right-40 w-[800px] h-[800px] rounded-full"></div>
<div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-container/30 bg-primary-container/5 text-primary font-label text-xs tracking-widest uppercase mb-8">
<span className="material-symbols-outlined text-sm" data-icon="psychology">psychology</span>
                AI-Powered Seizure Detection
            </div>
<h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-on-surface mb-6 leading-[1.1]">
                Detect Seizures with <br/>
<span className="hero-gradient-text">Precision &amp; Speed</span>
</h1>
<p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
                Transforming neurology through neural intelligence. Our clinical-grade AI platform analyzes EEGs in real-time to identify seizure activity with unprecedented accuracy.
            </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
<Link href="/register" className="synaptic-pulse px-8 py-4 rounded-full text-on-primary-fixed font-bold text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(217,70,239,0.1)] hover:shadow-[0_0_25px_rgba(217,70,239,0.8)] flex items-center gap-2">
                    Start Analysing EEGs
                    <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
</Link>
<a href="#about" className="px-8 py-4 rounded-full border border-outline/20 text-on-surface font-semibold text-lg hover:bg-surface-container-high transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="info">info</span>
                    Learn More
                </a>
</div>
</div>
{/* Animated SVG Wave Placeholder */}
<div className="w-full mt-24 opacity-30">
<svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 1440 120">
<path d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z" fill="url(#waveGradient)"></path>
<defs>
<linearGradient id="waveGradient" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#d946ef" stopOpacity={1}></stop>
<stop offset="100%" stopColor="#090e1c" stopOpacity={1}></stop>
</linearGradient>
</defs>
</svg>
</div>
</section>
{/* Features Section */}
<section id="about" className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000 ease-out py-24 bg-surface-container-low relative">
<div className="max-w-7xl mx-auto px-6">
<div className="mb-16">
<span className="text-primary font-label tracking-[0.2em] text-sm font-semibold mb-4 block">WHAT WE OFFER</span>
<h2 className="text-4xl font-headline font-bold text-on-surface">Everything a Neurologist Needs</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Feature 1 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="hub">hub</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">Multi-Scale Analysis</h3>
<p className="text-on-surface-variant leading-relaxed">Simultaneous processing of global and local EEG patterns for nuanced detection.</p>
</div>
{/* Feature 2 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">5-Min Results</h3>
<p className="text-on-surface-variant leading-relaxed">Turn hours of raw data into actionable insights in less than five minutes.</p>
</div>
{/* Feature 3 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">Explainability</h3>
<p className="text-on-surface-variant leading-relaxed">Interactive heatmaps showing exactly which segments triggered the AI alerts.</p>
</div>
{/* Feature 4 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="verified">verified</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">Clinical Grade</h3>
<p className="text-on-surface-variant leading-relaxed">Validated against thousands of expert-labeled clinical records for reliability.</p>
</div>
{/* Feature 5 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">Confidence Scoring</h3>
<p className="text-on-surface-variant leading-relaxed">Probabilistic analysis providing a certainty score for every detected event.</p>
</div>
{/* Feature 6 */}
<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(217,70,239,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(217,70,239,0.8)]"></span>
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="picture_as_pdf">picture_as_pdf</span>
</div>
<h3 className="text-xl font-headline font-bold text-on-surface mb-3">PDF Reports</h3>
<p className="text-on-surface-variant leading-relaxed">One-click generation of comprehensive, exportable diagnostic summaries.</p>
</div>
</div>
</div>
</section>
{/* How It Works Section */}
<section id="how-it-works" className="fade-in-section opacity-0 translate-y-10 transition-all duration-1000 ease-out py-24 bg-surface">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center mb-20">
<h2 className="text-4xl font-headline font-bold text-on-surface mb-4">Precision Workflow</h2>
<p className="text-on-surface-variant">Streamlined from upload to diagnosis</p>
</div>
<div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
{/* Connector Line */}
<div className="hidden md:block absolute top-10 left-0 w-full h-[2px] border-t-2 border-dashed border-on-surface/60 z-0"></div>
{/* Step 1 */}
<div className="relative z-10 flex flex-col items-center text-center">
<div className="w-20 h-20 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-6 shadow-lg">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="upload_file">upload_file</span>
</div>
<h4 className="text-on-surface font-bold mb-2">Upload EEG</h4>
<p className="text-on-surface-variant text-sm px-4">Securely upload standard EDF or ASCII data files.</p>
</div>
{/* Step 2 */}
<div className="relative z-10 flex flex-col items-center text-center">
<div className="w-20 h-20 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-6 shadow-lg">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="memory">memory</span>
</div>
<h4 className="text-on-surface font-bold mb-2">AI Analysis</h4>
<p className="text-on-surface-variant text-sm px-4">Neural networks process waveforms across all channels.</p>
</div>
{/* Step 3 */}
<div className="relative z-10 flex flex-col items-center text-center">
<div className="w-20 h-20 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-6 shadow-lg">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="fact_check">fact_check</span>
</div>
<h4 className="text-on-surface font-bold mb-2">Review Results</h4>
<p className="text-on-surface-variant text-sm px-4">Inspect AI-flagged seizure events and timeframes.</p>
</div>
{/* Step 4 */}
<div className="relative z-10 flex flex-col items-center text-center">
<div className="w-20 h-20 rounded-full bg-surface-container-highest border-4 border-surface flex items-center justify-center mb-6 shadow-lg">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="description">description</span>
</div>
<h4 className="text-on-surface font-bold mb-2">Generate Report</h4>
<p className="text-on-surface-variant text-sm px-4">Export findings to your hospital's EMR system.</p>
</div>
</div>
</div>
</section>

{/* CTA Banner */}
<section className="py-20 relative">
<div className="max-w-7xl mx-auto px-6">
<div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-surface-container-highest to-surface-container-low p-12 md:p-20 text-center border border-white/5 shadow-2xl">
{/* Bottom Glow */}
<div className="glow-leak absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-40"></div>
<h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6 relative z-10">Ready to transform EEG analysis?</h2>
<p className="text-on-surface-variant text-lg mb-10 max-w-2xl mx-auto relative z-10">Empower your practice with AI-assisted diagnostics. Instantly upload EEG recordings to generate precise patient analytics and seamlessly manage case histories all from one interactive dashboard.</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
<Link href="/register" className="synaptic-pulse px-10 py-4 rounded-full text-on-primary-fixed font-bold text-lg hover:scale-105 transition-all hover:shadow-[0_0_25px_rgba(217,70,239,0.8)]">
                        Get Started Now
                    </Link>
</div>
</div>
</div>
</section>
{/* Footer */}
<footer className="w-full py-12 border-t border-outline-variant bg-surface">
<div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 gap-6">
<div className="flex items-center gap-2">
<svg className="w-8 h-8 text-primary animate-[bounce-eeg_2s_infinite_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
   <path d="M2 12h4l3-9 5 18 3-9h5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<span className="text-xl font-bold font-headline text-on-surface">Neuro<span className="text-primary">Lens</span></span>
</div>
<div className="flex gap-8 text-sm font-body">
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
</div>
<p className="text-sm text-on-surface-variant font-body opacity-80">
                © 2024 NeuroLens AI. Precision Optics &amp; Neural Intelligence.
            </p>
</div>
</footer>

    </main>
  );
}
