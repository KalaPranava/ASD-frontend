import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { jsPDF } from "jspdf";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ResultsViewProps {
  state: string;
  recordings: any[];
}

export default function ResultsView({ state }: ResultsViewProps) {
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);

  if (state !== "results") return null;

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    try {
      const existingStr = window.localStorage.getItem("neurolens_clinical_notes");
      const existingList = existingStr ? JSON.parse(existingStr) : [];
      existingList.unshift({
        doctor: "Dr. Rivera",
        time: new Date().toISOString(),
        content: noteContent,
      });
      window.localStorage.setItem("neurolens_clinical_notes", JSON.stringify(existingList));
      setNoteAdded(true);
      setNoteContent("");
      setTimeout(() => setNoteAdded(false), 3000);
    } catch(e) {}
  };

  const handleVerify = (status: string) => {
    setVerificationStatus(status);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Mock Up Results", 10, 20);
    doc.setFont("helvetica", "normal");
    
    const lines = [
      `Patient Name: Marcus Holloway`,
      `Date of Report: ${new Date().toLocaleDateString()}`,
      "Recording Duration: 4.5 hours",
      "",
      "--- Your EEG Analysis Report ---",
      "This report summarizes the findings from your recent EEG scan.",
      "",
      "1. What We Looked At:",
      "   We analyzed 4.5 hours of brain wave activity reading from 23 sensors.",
      "   Our AI system scanned 8,100 segments (4 seconds each) of this data.",
      "",
      "2. What We Found:",
      "   - Seizure Events: 2 brief abnormal events were detected.",
      "   - AI Confidence: The system is 92.3% confident in these detections.",
      "",
      "3. What This Means For You:",
      "   Don't panic. These events have been flagged by our AI specifically for",
      "   your doctor (Dr. Rivera) to review. Many flagged events are minor.",
      "   Your neurologist will examine these moments in detail to verify.",
      "",
      "--- Next Steps ---",
      "This report has been uploaded to your profile. Your clinical team will",
      "reach out shortly to discuss these results and any necessary actions."
    ];
    
    let y = 30;
    lines.forEach(line => {
      doc.text(line, 10, y);
      y += 10;
    });
    
    doc.save("mock_up_results.pdf");
  };

  const handleUploadReport = () => {
    alert("Report sent to patient dashboard. Notification sent to the patient!");
  };

  // Mock data for Chart.js
  const chartData = {
    labels: Array.from({ length: 40 }, (_, i) => (i * 4).toString()), // 0-160 mins
    datasets: [
      {
        label: "Seizure Probability",
        data: Array.from({ length: 40 }, (_, i) => {
          if (i === 12 || i === 13) return 0.85 + Math.random() * 0.1; // ~35% mark
          if (i === 24 || i === 25) return 0.75 + Math.random() * 0.15; // ~71% mark
          return Math.random() * 0.2; // noise
        }),
        borderColor: "#5b8cff", // primary
        backgroundColor: "rgba(217, 70, 239, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Time in minutes", color: "#6e84b8" },
        grid: { color: "#1c2749" },
        ticks: { color: "#bfd3ff" },
      },
      y: {
        title: { display: true, text: "Seizure Probability", color: "#6e84b8" },
        min: 0,
        max: 1,
        grid: { color: "#1c2749" },
        ticks: { color: "#bfd3ff" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0d1323",
        titleColor: "#e1e4fa",
        bodyColor: "#5b8cff",
        borderColor: "#3d4c73",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-[1240px] mx-auto pb-12">
      {/* Alert Banner */}
      <div className="w-full bg-amber-500/10 border-l-[4px] border-amber-500 rounded-r-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-amber-500 text-[24px]">warning</span>
          <div>
            <h2 className="text-lg font-headline font-bold text-amber-500 mt-0.5">Seizure Activity Detected</h2>
            <p className="text-sm font-mono text-on-surface-variant mt-1">2 events identified in this recording requiring clinical review.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleDownloadPDF} className="px-5 py-2.5 bg-primary text-on-primary-fixed font-bold text-sm rounded-lg hover:bg-primary-dim transition-all duration-300 shadow-[0_4px_15px_rgba(91,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(91,140,255,0.45)] hover:-translate-y-0.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span> Download Report
          </button>
          <button onClick={handleUploadReport} className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-sm rounded-lg hover:bg-emerald-500 transition-all duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 flex items-center gap-2 border border-emerald-500">
            <span className="material-symbols-outlined text-[18px]">upload</span> Send to Patient
          </button>
        </div>
      </div>

      {/* Recording Info Row */}
      <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-on-surface-variant bg-surface-container border border-outline-variant/30 px-6 py-4 rounded-xl">
        <span className="text-on-surface font-semibold">Patient: Marcus Holloway</span>
        <span className="opacity-40">•</span>
        <span>Duration: 4.5 hours</span>
        <span className="opacity-40">•</span>
        <span>Date: 14 Oct 2026</span>
        <span className="opacity-40">•</span>
        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/40 px-2 py-0.5 rounded uppercase text-[10px] font-bold tracking-widest">Seizure Found</span>
        <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/40 px-2 py-0.5 rounded uppercase text-[10px] font-bold tracking-widest">92.3% Confidence</span>
      </div>

      {/* EEG Timeline Card */}
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-lg text-primary">EEG Timeline</h3>
          <span className="text-xs font-mono text-outline bg-surface-container-highest px-3 py-1 rounded-full border border-outline-variant/30">4.5 hours recorded</span>
        </div>
        
        <div className="relative w-full h-8 mt-4 pt-2 group cursor-crosshair">
          {/* Background Bar */}
          <div className="w-full h-4 bg-surface-container-highest rounded-full shadow-inner overflow-hidden absolute top-2"></div>
          
          {/* Seizure Event 1 at ~35% */}
          <div className="absolute top-2 h-4 bg-amber-500 w-[2%] left-[35%] rounded-md shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10 transition-transform hover:scale-y-150 transform origin-center" title="Onset: 01:24:06&#10;Duration: 47s"></div>
          {/* Seizure Event 2 at ~71% */}
          <div className="absolute top-2 h-4 bg-amber-500 w-[1.5%] left-[71%] rounded-md shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10 transition-transform hover:scale-y-150 transform origin-center" title="Onset: 03:12:44&#10;Duration: 31s"></div>
          
          {/* Time text below directly in the div */}
        </div>
        
        <div className="flex justify-between text-xs font-mono text-outline pt-2">
          <span>0:00</span>
          <span>1:00</span>
          <span>2:00</span>
          <span>3:00</span>
          <span>4:00</span>
          <span>4:30</span>
        </div>

        <div className="flex gap-4 text-xs font-semibold pt-2 text-on-surface-variant">
           <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span> Normal EEG</div>
           <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></span> Seizure Event</div>
        </div>
      </div>

      {/* 2 Seizure Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low border border-outline-variant/20 border-l-[4px] border-l-amber-500 rounded-xl p-5 shadow-lg relative">
           <div className="flex justify-between items-start mb-5">
             <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Event 1</div>
             <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30 px-2 py-0.5 rounded leading-none flex items-center">Confirmed</span>
           </div>
           
           <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5 font-mono text-sm">
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Onset Time</div><div className="text-on-surface font-semibold">01:24:06</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Duration</div><div className="text-on-surface font-semibold">47 seconds</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Confidence</div><div className="text-emerald-500 font-bold">92.3%</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Channels</div><div className="text-on-surface text-xs bg-surface-container px-2 py-1 rounded inline-block">T3-T5, F7-F3</div></div>
           </div>

           <div className="w-full bg-surface-container h-1 rounded flex mb-6"><div className="w-[92.3%] bg-emerald-500 rounded shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div></div>
           <button className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-primary text-sm font-bold rounded-lg border border-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(91,140,255,0.2)] hover:border-primary/50">View Details</button>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/20 border-l-[4px] border-l-amber-500 rounded-xl p-5 shadow-lg relative">
           <div className="flex justify-between items-start mb-5">
             <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Event 2</div>
             <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 px-2 py-0.5 rounded leading-none flex items-center">Pending Review</span>
           </div>
           
           <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5 font-mono text-sm">
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Onset Time</div><div className="text-on-surface font-semibold">03:12:44</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Duration</div><div className="text-on-surface font-semibold">31 seconds</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Confidence</div><div className="text-primary font-bold">78.6%</div></div>
              <div><div className="text-[10px] text-outline uppercase tracking-widest mb-1">Channels</div><div className="text-on-surface text-xs bg-surface-container px-2 py-1 rounded inline-block">C3-P3, T5-O1</div></div>
           </div>

           <div className="w-full bg-surface-container h-1 rounded flex mb-6"><div className="w-[78.6%] bg-primary rounded shadow-[0_0_10px_rgba(91,140,255,0.5)]"></div></div>
           <button className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-primary text-sm font-bold rounded-lg border border-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(91,140,255,0.2)] hover:border-primary/50">View Details</button>
        </div>
      </div>

      {/* Chart.js Confidence Card */}
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-end mb-6">
           <div>
             <h3 className="font-headline font-bold text-lg text-primary">Seizure Probability Over Time</h3>
             <p className="text-xs text-outline font-mono mt-1">200 windows analysed | 4.5 hours | Model: CNN-Tx V2</p>
           </div>
           <div className="flex gap-2 text-[10px] uppercase font-bold tracking-widest">
             <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded border border-amber-500/20">Peak: 92.3%</span>
             <span className="bg-surface-container-highest text-outline px-2 py-1 rounded border border-outline-variant/30">Threshold: 50%</span>
             <span className="bg-primary/20 text-primary px-2 py-1 rounded border border-primary/20">Events: 2</span>
           </div>
        </div>

        <div className="w-full relative h-[220px]">
           {/* Custom dashed line for generic Chart.js overlay */}
           <div className="absolute top-[50%] left-0 w-full border-t border-dashed border-amber-500/40 z-0 pointer-events-none"></div>
           <span className="absolute top-[50%] left-1 -translate-y-[120%] text-[10px] font-mono text-amber-500/60 z-0 pointer-events-none">Detection Threshold</span>
           <div className="absolute h-full w-[5%] left-[34%] bg-amber-500/10 pointer-events-none -z-0"></div>
           <div className="absolute h-full w-[4%] left-[70%] bg-amber-500/10 pointer-events-none -z-0"></div>
           
           <div className="w-full h-full relative z-10"><Line data={chartData} options={chartOptions} /></div>
        </div>
      </div>

      {/* Explainability SVG Cards Base */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Brain Topography */}
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl flex flex-col">
           <div>
             <h3 className="font-headline font-bold text-lg text-primary">Brain Topography</h3>
             <p className="text-xs text-outline mt-1 font-body">Channel importance for detected seizure (Event 1)</p>
           </div>
           
           <div className="flex-1 min-h-[200px] flex items-center justify-center relative my-4">
             {/* Mock 10-20 Head SVG */}
             <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] opacity-90 relative top-2">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3d4c73" strokeWidth="2" />
                <path d="M 50 2 L 45 5 L 55 5 Z" fill="#3d4c73" /> {/* Nose */}
                <path d="M 2 40 C -2 45, -2 55, 2 60" fill="none" stroke="#3d4c73" strokeWidth="2" /> {/* Left Ear */}
                <path d="M 98 40 C 102 45, 102 55, 98 60" fill="none" stroke="#3d4c73" strokeWidth="2" /> {/* Right Ear */}
                
                {/* Dots */}
                <circle cx="20" cy="50" r="3.5" fill="#f59e0b" className="animate-pulse" /> {/* T3 - High */}
                <circle cx="28" cy="70" r="3.5" fill="#f59e0b" className="animate-pulse" /> {/* T5 - High */}
                <circle cx="28" cy="30" r="3.5" fill="#5b8cff" /> {/* F7 - Medium */}
                <circle cx="35" cy="50" r="3" fill="#5b8cff" /> {/* C3 - Medium */}
                <circle cx="35" cy="70" r="3" fill="#5b8cff" /> {/* P3 - Medium */}
                <circle cx="35" cy="30" r="3" fill="#5b8cff" /> {/* F3 - Medium */}
                
                <circle cx="50" cy="20" r="2.5" fill="#1c2749" /> {/* Fz - Low */}
                <circle cx="50" cy="40" r="2.5" fill="#1c2749" /> {/* Cz - Low */}
                <circle cx="50" cy="60" r="2.5" fill="#1c2749" /> {/* Pz - Low */}
                <circle cx="50" cy="80" r="2.5" fill="#1c2749" /> {/* Oz - Low */}

                <circle cx="80" cy="50" r="2.5" fill="#1c2749" /> {/* T4 */}
                <circle cx="72" cy="70" r="2.5" fill="#1c2749" /> {/* T6 */}
                <circle cx="72" cy="30" r="2.5" fill="#1c2749" /> {/* F8 */}
                <circle cx="65" cy="50" r="2.5" fill="#1c2749" /> {/* C4 */}
                <circle cx="65" cy="70" r="2.5" fill="#1c2749" /> {/* P4 */}
                <circle cx="65" cy="30" r="2.5" fill="#1c2749" /> {/* F4 */}
             </svg>
           </div>
           
           <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-outline mb-2">
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span> Low</div>
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Medium</div>
             <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> High</div>
           </div>
        </div>

        {/* Temporal Attention Heatmap */}
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl flex flex-col">
           <div>
             <h3 className="font-headline font-bold text-lg text-primary">Temporal Attention</h3>
             <p className="text-xs text-outline mt-1 font-body">Where the model focused during seizure window</p>
           </div>

           <div className="flex-1 flex flex-col justify-center items-center mt-6">
              
              <div className="w-full max-w-[400px] flex items-end gap-1 mb-2 relative h-[80px]">
                 <div className="absolute left-[65%] top-[-20px] bottom-0 w-px bg-amber-500/50 border-dashed pointer-events-none"></div>
                 <div className="absolute left-[65%] top-[-35px] -translate-x-1/2 text-[10px] font-bold text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Peak</div>
                 
                 {/* Generate 40 narrow bars for heatmap */}
                 {Array.from({ length: 40 }).map((_, i) => {
                    let weight = 0;
                    if (Math.abs(i - 26) < 4) weight = 1 - (Math.abs(i - 26) * 0.2);
                    else if (Math.abs(i - 12) < 3) weight = 0.6 - (Math.abs(i - 12) * 0.15);
                    else weight = Math.random() * 0.2;
                    
                    const h = Math.max(10, weight * 100) + "%";
                    const bg = weight > 0.8 ? "bg-amber-500" : weight > 0.4 ? "bg-primary" : "bg-surface-container-high";
                    const opa = Math.max(0.3, weight);

                    return <div key={i} className={`flex-1 ${bg} rounded-t-sm transition-all duration-300 hover:opacity-100`} style={{ height: h, opacity: opa }} title={`Attention weight: ${(weight * 100).toFixed(1)}%`}></div>
                 })}
              </div>
              
              <div className="w-full max-w-[400px] flex justify-between text-[10px] font-mono text-outline border-t border-outline-variant/30 pt-2 mb-4">
                 <span>0s</span><span>1s</span><span>2s</span><span>3s</span><span>4s</span>
              </div>
              <div className="text-xs text-on-surface-variant italic">Peak attention clearly isolated at 2.8s mark in 4s window.</div>
           </div>
        </div>

      </div>

      {/* Verification Panel */}
      <div className="bg-surface-container-highest/30 border border-primary/20 rounded-2xl p-8 shadow-xl mt-4 relative overflow-hidden">
         <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-amber-500"></div>
         <div className="text-center mb-6">
            <h3 className="font-headline font-bold text-xl text-on-surface">Doctor Verification Required</h3>
            <p className="text-sm text-on-surface-variant mt-1">Please review the detected seizures and verify the AI analysis.</p>
         </div>
         
         {!verificationStatus ? (
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <button onClick={() => handleVerify("confirmed")} className="flex-1 max-w-[200px] w-full py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 rounded-xl font-bold font-headline text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 flex justify-center items-center gap-2">
               <span className="material-symbols-outlined text-[20px]">check_circle</span> Confirm Detection
             </button>
             <button onClick={() => handleVerify("uncertain")} className="flex-1 max-w-[200px] w-full py-3.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-xl font-bold font-headline text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 flex justify-center items-center gap-2">
               <span className="material-symbols-outlined text-[20px]">help_center</span> Mark Uncertain
             </button>
             <button onClick={() => handleVerify("rejected")} className="flex-1 max-w-[200px] w-full py-3.5 bg-error/10 hover:bg-error/20 text-error border border-error/50 rounded-xl font-bold font-headline text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 flex justify-center items-center gap-2">
               <span className="material-symbols-outlined text-[20px]">cancel</span> Reject Detection
             </button>
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl max-w-md mx-auto animate-in zoom-in-95 duration-300">
             <div className="flex items-center gap-2 text-emerald-500 font-bold mb-2">
               <span className="material-symbols-outlined">verified</span> Verification Saved
             </div>
             <p className="text-sm text-on-surface-variant text-center">Clinical report has been updated successfully.</p>
             <p className="text-[10px] uppercase font-mono text-outline mt-3 font-bold tracking-widest">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date())}</p>
           </div>
         )}
      </div>

      {/* Add Clinical Note */}
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 shadow-xl mt-8 relative overflow-hidden">
         <h3 className="font-headline font-bold text-xl text-on-surface mb-2">Add Clinical Note</h3>
         <p className="text-sm text-on-surface-variant mb-6">These notes will be synchronized to the patient's profile in real-time.</p>
         
         <textarea 
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Type your clinical observation here..."
            className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 min-h-[120px] mb-4 font-body"
         />
         
         <div className="flex justify-end items-center gap-4">
            {noteAdded && <span className="text-emerald-500 text-sm font-bold flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2"><span className="material-symbols-outlined text-[18px]">check_circle</span> Saved to Patient Profile</span>}
            <button 
               onClick={handleAddNote}
               disabled={!noteContent.trim()}
               className="px-6 py-3 bg-primary text-on-primary-fixed font-bold rounded-lg hover:bg-primary-dim transition-all shadow-[0_4px_15px_rgba(91,140,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:-translate-y-0 flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-[20px]">add_notes</span> Save Note
            </button>
         </div>
      </div>

    </div>
  );
}
