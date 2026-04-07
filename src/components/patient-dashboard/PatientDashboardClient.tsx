"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import OverviewView from "./OverviewView";
import NeuralReportsView from "./PlaceholderViews/NeuralReportsView";
import PatientHistoryView from "./PlaceholderViews/PatientHistoryView";
import ClinicalNotesView from "./PlaceholderViews/ClinicalNotesView";

type TabId = "dashboard" | "neural-reports" | "patient-history" | "clinical-notes";

export default function PatientDashboardClient() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <OverviewView />;
      case "neural-reports":
        return <NeuralReportsView />;
      case "patient-history":
        return <PatientHistoryView />;
      case "clinical-notes":
        return <ClinicalNotesView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] flex flex-col bg-surface border-r-0 shadow-[4px_0_20px_rgba(217,70,239,0.04)] z-50 bg-gradient-to-b from-surface-container-low to-surface font-headline tracking-tight">
        <div className="p-8 flex flex-col gap-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary animate-[bounce-eeg_2s_infinite_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M2 12h4l3-9 5 18 3-9h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-2xl font-bold font-headline tracking-tight">
              <span className="text-on-surface">Neuro</span><span className="text-primary">Lens</span>
            </span>
          </div>
          <p className="text-[10px] text-on-surface-variant/60 pl-10 uppercase tracking-[0.2em]">Precision Optics</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            id="dashboard" 
            label="Dashboard" 
            icon="dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <NavItem 
            id="neural-reports" 
            label="Neural Reports" 
            icon="neurology" 
            active={activeTab === "neural-reports"} 
            onClick={() => setActiveTab("neural-reports")} 
          />
          <NavItem 
            id="patient-history" 
            label="Patient History" 
            icon="history" 
            active={activeTab === "patient-history"} 
            onClick={() => setActiveTab("patient-history")} 
          />
          <NavItem 
            id="clinical-notes" 
            label="Clinical Notes" 
            icon="description" 
            active={activeTab === "clinical-notes"} 
            onClick={() => setActiveTab("clinical-notes")} 
          />
        </nav>


      </aside>

      {/* TopNavBar Fixed */}
      <header className="fixed top-0 right-0 left-[260px] h-20 bg-surface/80 backdrop-blur-3xl border-b border-outline-variant/15 flex justify-end items-center px-10 z-40 font-body font-medium transition-all">
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <div className="relative cursor-pointer group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant group-hover:text-primary transition-colors bg-surface-container-highest group-hover:bg-primary/10">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(217,70,239,0.8)] border-2 border-surface"></span>
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-outline-variant/20 cursor-pointer group">
            <div className="text-right flex flex-col items-end">
              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Alexander</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">ID: PX-9928</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/40 group-hover:border-primary shadow-[0_0_10px_rgba(217,70,239,0.2)] group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all bg-surface-container-high flex items-center justify-center text-primary font-bold">
              AL
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-[260px] mt-20 p-10 min-h-[calc(100vh-80px)] relative overflow-x-hidden w-full">
        {renderContent()}
      </main>
    </div>
  );
}

// Subcomponents
function NavItem({ id, label, icon, active, onClick }: { id: string, label: string, icon: string, active: boolean, onClick: () => void }) {
  if (active) {
    return (
      <button 
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-primary/10 text-primary rounded-xl border-r-4 border-primary transition-all duration-300 shadow-[inset_4px_0_20px_rgba(217,70,239,0.05)] hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all"
      >
        <span className="material-symbols-outlined">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-on-surface-variant transition-all duration-300 hover:bg-surface-container-high rounded-xl group hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]"
    >
      <span className="material-symbols-outlined transition-transform group-hover:scale-110">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {/* Add purple glow on hover for non-active items */}
      <div className="absolute left-0 w-1 h-0 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 group-hover:h-8 transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
    </button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;
  
  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-colors bg-surface-container-highest hover:bg-primary/10"
    >
      <span className="material-symbols-outlined">{theme === "light" ? "light_mode" : "dark_mode"}</span>
    </button>
  );
}
