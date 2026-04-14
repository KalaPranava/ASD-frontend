"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


import { jsPDF } from "jspdf";

interface Recording {
  patient: string;
  file: string;
  date: string;
  duration: string;
  status: "Processed" | "Processing" | "Failed";
  action: string;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  symptoms: string;
}

export default function DashboardClient() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ firstName: "", lastName: "", gender: "Male", age: "", symptoms: "" });
  
  const [activeTab, setActiveTab] = useState<"dashboard" | "patient-analytics">("dashboard");
  const [isAnalysed, setIsAnalysed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingsList, setRecordingsList] = useState<Recording[]>([]);
  const [analyticsSelectedPatientName, setAnalyticsSelectedPatientName] = useState<string | null>(null);
  
  // Upload State variables
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");

  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("Rivera");
  const [selectedEventPopup, setSelectedEventPopup] = useState<number | null>(null);

  const [showSendReportModal, setShowSendReportModal] = useState(false);
  const [sendMethod, setSendMethod] = useState<"email" | "whatsapp" | null>(null);
  const [contactInput, setContactInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
    
    // Load persisted doctor name
    try {
      const activeUserStr = window.localStorage.getItem("activeUser");
      if (activeUserStr) {
        const activeUser = JSON.parse(activeUserStr);
        if (activeUser.firstName) setDoctorFirstName(activeUser.firstName);
        if (activeUser.lastName) setDoctorLastName(activeUser.lastName);
      }
    } catch(e) {}
    
    // Load persisted patients
    try {
      const stored = window.localStorage.getItem("neurolens_patients");
      if (stored) {
        setPatients(JSON.parse(stored));
      }
    } catch(e) {}
    
    // Load persisted recordings
    try {
      const storedRecs = window.localStorage.getItem("neurolens_recordings");
      if (storedRecs) {
        const parsedRecs = JSON.parse(storedRecs) as Recording[];
        // Auto-clean any duplicates from older sessions
        const uniqueRecs = parsedRecs.filter((rec, index, self) =>
          index === self.findIndex((t) => (
            t.patient === rec.patient && t.file === rec.file
          ))
        );
        window.localStorage.setItem("neurolens_recordings", JSON.stringify(uniqueRecs));
        setRecordingsList(uniqueRecs);
      }
    } catch(e) {}
  }, []);

  // --- Reset/Handlers ---
  const handleNewAnalysis = () => {
    setIsAnalysed(false);
    setSelectedPatient("");
    setSelectedFile(null);
    setUploadError("");
    setVerificationStatus(null);
    setNoteContent("");
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".edf")) setSelectedFile(file);
    }
  };

  const startAnalysis = () => {
    if (!selectedPatient) {
      setUploadError("Please select a patient before analysing.");
      return;
    }
    setUploadError("");
    // Hide old results & start processing animation
    setIsAnalysed(false);
    setIsAnalyzing(true);
    
    // Simulate real analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalysed(true);
      
      const matchedPatientEntry = patients.find(p => p.id === selectedPatient);
      // If not found in dynamic map, check if it's one of the mock ID leftovers or just show id
      const patientNameFormatted = matchedPatientEntry ? matchedPatientEntry.id : selectedPatient;
      
      setRecordingsList(prev => {
        const fileUploadName = selectedFile?.name || "eeg_recording.edf";
        
        // Remove old occurrences of EXACT same patient+file before adding it anew to prevent duplicates
        const filteredList = prev.filter(r => !(r.patient === patientNameFormatted && r.file === fileUploadName));
        
        const newList: Recording[] = [
          {
            patient: patientNameFormatted,
            file: fileUploadName,
            date: new Date().toISOString().split("T")[0],
            duration: "04:30:00", // using mock value for now
            status: "Processed",
            action: "View Results"
          },
          ...filteredList
        ];
        window.localStorage.setItem("neurolens_recordings", JSON.stringify(newList));
        return newList;
      });
    }, 1800); // 1.8 seconds processing time
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    try {
      const existingStr = window.localStorage.getItem("neurolens_clinical_notes");
      const existingList = existingStr ? JSON.parse(existingStr) : [];
      existingList.unshift({
        doctor: `Dr. ${doctorLastName}`,
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
      `Patient Name: ${patients.find(p => p.id === selectedPatient) ? `${patients.find(p => p.id === selectedPatient)?.firstName} ${patients.find(p => p.id === selectedPatient)?.lastName}` : (selectedPatient || "Unknown")}`,
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
      `   your doctor (Dr. ${doctorLastName}) to review. Many flagged events are minor.`,
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
    setShowSendReportModal(true);
    setSendMethod(null);
    setContactInput("");
    setSendSuccess(false);
  };

  const executeSendReport = () => {
    if (!contactInput.trim()) return;
    setIsSending(true);
    
    // Simulate real backend processing delay
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      
      // Auto-close modal after showing success message
      setTimeout(() => {
        setShowSendReportModal(false);
      }, 2500);
    }, 1500);
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

  if (!mounted) return null;

  return (
    <div className="flex bg-surface text-on-surface min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-[260px] flex flex-col bg-surface border-r-0 shadow-[4px_0_20px_rgba(91,140,255,0.04)] z-50 bg-gradient-to-b from-surface-container-low to-surface font-headline tracking-tight">
        <div className="p-8 flex flex-col gap-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary animate-[bounce-eeg_2s_infinite_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M2 12h4l3-9 5 18 3-9h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-2xl font-bold font-headline tracking-tight">
              <span className="text-on-surface">Neuro</span><span className="text-primary">Lens</span>
            </span>
          </div>
          <p className="text-[10px] text-on-surface-variant/60 pl-10 uppercase tracking-[0.2em]">Doctor Console</p>
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
            id="patient-analytics" 
            label="Patient Analytics" 
            icon="group" 
            active={activeTab === "patient-analytics"} 
            onClick={() => { setActiveTab("patient-analytics"); setAnalyticsSelectedPatientName(null); }} 
          />
          <NavItem 
            id="system-settings" 
            label="System Settings" 
            icon="settings" 
            active={false} 
            onClick={() => {}} 
          />
        </nav>

        <div className="p-6 border-t border-outline-variant/30 mb-8">
          <button onClick={handleNewAnalysis} className="w-full py-3 bg-primary text-on-primary-fixed font-semibold text-sm rounded-xl hover:bg-primary-dim transition-all duration-300 shadow-[0_4px_15px_rgba(91,140,255,0.4)] hover:shadow-[0_4px_25px_rgba(91,140,255,0.45)] hover:-translate-y-0.5">
            + New Analysis
          </button>
        </div>
      </aside>

      {/* NAVBAR */}
      <nav className="fixed top-0 right-0 left-[260px] h-20 bg-surface/80 backdrop-blur-3xl border-b border-outline-variant/15 flex items-center justify-end px-10 z-40 font-body font-medium transition-all">
        <div className="flex items-center gap-6">
          <button className="relative flex items-center justify-center p-2.5 rounded-full border border-outline/20 text-on-surface hover:bg-surface-bright transition-all hover:shadow-[0_0_20px_rgba(91,140,255,0.45)] group">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500"></span>
          </button>
          
          <ThemeToggle />
          
          <div className="flex items-center gap-4 pl-6 border-l border-outline-variant/20 cursor-pointer relative" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="text-right flex flex-col items-end group">
              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Dr. {doctorLastName}
              </p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">Neurologist</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/40 hover:border-primary shadow-[0_0_10px_rgba(91,140,255,0.2)] hover:shadow-[0_0_15px_rgba(91,140,255,0.5)] transition-all bg-surface-container-high flex items-center justify-center text-primary font-bold uppercase">
              {doctorFirstName ? doctorFirstName[0] : "D"}{doctorLastName ? doctorLastName[0] : "R"}
            </div>

            <div className={`absolute top-[120%] right-0 mt-2 bg-surface/90 border border-outline-variant/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all p-2 z-50 min-w-[160px] backdrop-blur-xl origin-top-right ${isProfileOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
               <div 
                 onClick={(e) => {
                   e.stopPropagation();
                   window.localStorage.removeItem("activeUser");
                   window.location.href = "/"; // Go to landing screen
                 }} 
                 className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-error/90 hover:text-[#ff2a2a] hover:bg-error/10 hover:shadow-[0_0_15px_rgba(255,42,42,0.4)] rounded-lg whitespace-nowrap transition-all duration-300 w-full text-left cursor-pointer"
               >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Log Out
               </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main 
        onClick={() => { if (isProfileOpen) setIsProfileOpen(false); }}
        className="flex-1 ml-[260px] mt-20 px-10 pt-4 pb-10 overflow-y-auto w-full relative"
      >
        {/* Background glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(91,140,255,0.15)_0%,rgba(9,14,28,0)_70%)]"></div>

        {/* --- EVENT MODAL --- */}
      {selectedEventPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedEventPopup(null)}>
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/20 bg-surface-container-high">
              <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">warning</span>
                Seizure window analysis - Event {selectedEventPopup}
              </h3>
              <button onClick={() => setSelectedEventPopup(null)} className="p-1 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 flex flex-col items-center">
                 {/* Mock EEG Chart Block */}
                 <div className="w-full h-[200px] border border-dashed border-outline-variant/50 rounded flex items-center justify-center relative overflow-hidden bg-surface-container-low hidden md:flex">
                    {/* SVG abstract graph */}
                    <svg viewBox="0 0 800 200" className="w-full h-full opacity-70 absolute" preserveAspectRatio="none">
                      <path d="M0,100 C40,110 60,60 100,100 C150,150 200,50 250,90 C300,130 310,180 350,100 C390,20 420,20 450,100 C480,180 500,20 550,100 C600,180 620,110 650,90 C700,70 720,130 750,100 C780,70 800,120 800,120" stroke="var(--color-primary)" fill="none" strokeWidth="2" />
                      <path d="M0,130 C40,130 60,80 100,150 C150,190 200,90 250,130 C300,170 310,70 350,140 C390,210 420,20 450,90 C480,160 500,60 550,120 C600,180 620,120 650,70 C700,20 720,110 750,130 C780,150 800,100 800,100" stroke="#f59e0b" fill="none" strokeWidth="2" style={selectedEventPopup === 1 ? { stroke: '#10b981' } : {}}/>
                      <path d="M0,70 C40,50 60,110 100,60 C150,10 200,140 250,80 C300,20 310,160 350,70 C390,20 420,160 450,80 C480,0 500,190 550,90 C600,0 620,150 650,120 C700,90 720,50 750,90 C780,130 800,60 800,60" stroke="#3b82f6" fill="none" strokeWidth="1.5"/>
                    </svg>
                    <div className="absolute inset-y-0 w-32 left-[40%] bg-amber-500/20 border-l border-r border-amber-500/50 flex flex-col justify-start p-2">
                       <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Detected Spike</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] uppercase text-outline tracking-wider font-bold mb-1">Onset Time</div>
                  <div className="font-mono text-sm text-on-surface font-bold">{selectedEventPopup === 1 ? '01:24:06' : '03:12:44'}</div>
                </div>
                <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] uppercase text-outline tracking-wider font-bold mb-1">Duration</div>
                  <div className="font-mono text-sm text-on-surface font-bold">{selectedEventPopup === 1 ? '47 seconds' : '31 seconds'}</div>
                </div>
                <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] uppercase text-outline tracking-wider font-bold mb-1">Primary Channels</div>
                  <div className="font-mono text-sm text-on-surface font-bold">{selectedEventPopup === 1 ? 'T3-T5, F7-F3' : 'C3-P3, T5-O1'}</div>
                </div>
                <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/10">
                  <div className="text-[10px] uppercase text-outline tracking-wider font-bold mb-1">Model Confidence</div>
                  <div className={`font-mono text-sm font-bold ${selectedEventPopup === 1 ? 'text-emerald-500' : 'text-primary'}`}>{selectedEventPopup === 1 ? '92.3%' : '78.6%'}</div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-highest p-4 flex justify-end gap-3 rounded-b-2xl border-t border-outline-variant/20">
               <button onClick={() => setSelectedEventPopup(null)} className="px-5 py-2 font-bold text-sm text-on-surface-variant hover:text-on-surface transition-colors">Close Viewer</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SEND REPORT MODAL --- */}
      {showSendReportModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowSendReportModal(false)}>
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/20 bg-surface-container-high">
              <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">send</span>
                Send Report to Patient
              </h3>
              <button onClick={() => setShowSendReportModal(false)} className="p-1 hover:bg-surface-variant rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              {sendSuccess ? (
                <div className="flex flex-col items-center p-6 text-center animate-in fade-in slide-in-from-bottom-2">
                   <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <span className="material-symbols-outlined text-[36px]">check_circle</span>
                   </div>
                   <h4 className="text-xl font-bold font-headline text-on-surface mb-2">Report Successfully Sent</h4>
                   <p className="text-on-surface-variant text-sm">The patient has been securely notified via {sendMethod === 'email' ? 'Email' : 'WhatsApp'}.</p>
                </div>
              ) : !sendMethod ? (
                <>
                  <p className="text-on-surface-variant text-center mb-6 text-sm">Choose how you'd like to deliver this clinical report to <strong>{patients.find(p => p.id === selectedPatient)?.firstName || "the patient"}</strong>.</p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    <button 
                      onClick={() => setSendMethod('email')} 
                      className="w-full flex items-center gap-4 bg-surface-container-highest border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/10 transition-all p-4 rounded-xl group"
                    >
                       <div className="w-10 h-10 bg-blue-500/20 text-blue-500 flex items-center justify-center rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">mail</span>
                       </div>
                       <div className="text-left">
                          <div className="font-bold text-on-surface">Secure Email</div>
                          <div className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors mt-0.5">Send a PDF link to their inbox</div>
                       </div>
                    </button>

                    <button 
                      onClick={() => setSendMethod('whatsapp')} 
                      className="w-full flex items-center gap-4 bg-surface-container-highest border border-outline-variant/30 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all p-4 rounded-xl group"
                    >
                       <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">forum</span>
                       </div>
                       <div className="text-left">
                          <div className="font-bold text-on-surface">WhatsApp / SMS</div>
                          <div className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors mt-0.5">Send a secure mobile access link</div>
                       </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full animate-in slide-in-from-right-4 fade-in duration-300">
                  <button onClick={() => setSendMethod(null)} className="flex items-center text-xs text-primary font-bold hover:underline mb-4 gap-1">
                     <span className="material-symbols-outlined text-[14px]">arrow_back</span> Choose different method
                  </button>
                  
                  <label className="block text-sm font-semibold text-on-surface mb-2">
                     {sendMethod === 'email' ? "Enter Patient's Email Address" : "Enter Patient's WhatsApp Number"}
                  </label>
                  <input 
                     type={sendMethod === 'email' ? "email" : "tel"}
                     value={contactInput}
                     onChange={(e) => setContactInput(e.target.value)}
                     placeholder={sendMethod === 'email' ? "e.g. patient@example.com" : "e.g. +1 234 567 8900"}
                     className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 mb-6"
                     autoFocus
                  />

                  <button 
                    onClick={executeSendReport}
                    disabled={!contactInput.trim() || isSending}
                    className="w-full py-3 bg-primary text-on-primary-fixed font-bold rounded-xl hover:bg-primary-dim transition-all shadow-[0_4px_15px_rgba(91,140,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                     {isSending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <><span className="material-symbols-outlined text-[18px]">send</span> Send Now</>
                     )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showAddPatientModal && (
          <div className="fixed inset-0 bg-[#0d0912]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
             <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-8 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
               <h3 className="text-xl font-headline font-bold text-primary mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined">person_add</span> Add New Patient
               </h3>
               
               <div className="space-y-4 font-body">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[11px] text-outline uppercase tracking-wider mb-1.5 block">First Name</label>
                     <input className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-3 text-sm focus:border-primary/50 border-solid text-on-surface focus:ring-1 focus:ring-primary/30 outline-none" value={newPatient.firstName} onChange={e => setNewPatient({...newPatient, firstName: e.target.value})} placeholder="e.g. John" />
                   </div>
                   <div>
                     <label className="text-[11px] text-outline uppercase tracking-wider mb-1.5 block">Last Name</label>
                     <input className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-3 text-sm focus:border-primary/50 border-solid text-on-surface focus:ring-1 focus:ring-primary/30 outline-none" value={newPatient.lastName} onChange={e => setNewPatient({...newPatient, lastName: e.target.value})} placeholder="e.g. Doe" />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[11px] text-outline uppercase tracking-wider mb-1.5 block">Gender</label>
                     <select className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-3 text-sm focus:border-primary/50 border-solid text-on-surface focus:ring-1 focus:ring-primary/30 outline-none" value={newPatient.gender} onChange={e => setNewPatient({...newPatient, gender: e.target.value})}>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-[11px] text-outline uppercase tracking-wider mb-1.5 block">Age</label>
                     <input type="number" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-3 text-sm focus:border-primary/50 border-solid text-on-surface focus:ring-1 focus:ring-primary/30 outline-none" value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})} placeholder="e.g. 45" />
                   </div>
                 </div>

                 <div>
                    <label className="text-[11px] text-outline uppercase tracking-wider mb-1.5 block">Clinical Symptoms</label>
                    <textarea className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-3 text-sm focus:border-primary/50 border-solid text-on-surface focus:ring-1 focus:ring-primary/30 outline-none min-h-[80px]" value={newPatient.symptoms} onChange={e => setNewPatient({...newPatient, symptoms: e.target.value})} placeholder="Describe symptoms..."></textarea>
                 </div>
               </div>

               <div className="mt-8 flex justify-end gap-3 font-headline">
                 <button onClick={() => setShowAddPatientModal(false)} className="px-5 py-2.5 text-sm text-outline hover:text-on-surface transition-colors rounded-xl hover:bg-surface-variant font-semibold">Cancel</button>
                 <button onClick={() => {
                   if(!newPatient.firstName) return;
                   const idNumber = patients.length + 1;
                   const id = `P${String(idNumber).padStart(3, '0')}`;
                   const updatedPatients = [...patients, { id, ...newPatient }];
                   setPatients(updatedPatients);
                   window.localStorage.setItem("neurolens_patients", JSON.stringify(updatedPatients));
                   setShowAddPatientModal(false);
                   setNewPatient({ firstName: "", lastName: "", gender: "Male", age: "", symptoms: "" });
                 }} className="px-5 py-2.5 bg-primary text-on-primary-fixed rounded-xl font-bold shadow-[0_0_15px_rgba(91,140,255,0.4)] hover:shadow-[0_0_25px_rgba(91,140,255,0.45)] transition-all uppercase tracking-wide text-sm flex items-center gap-2">
                   <span className="material-symbols-outlined text-[18px]">save</span> Save Patient
                 </button>
               </div>
             </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="max-w-[1240px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            {/* Top Greeting Row */}
            <section className="mb-8 relative">
              <h2 className="font-headline text-4xl text-on-surface font-bold tracking-tight mb-2">
                {greeting}, Dr. {doctorFirstName ? `${doctorFirstName} ${doctorLastName}` : "Rivera"} 👋
              </h2>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                System-wide neural monitoring and EEG analysis. Ready for new patient data.
              </p>
            </section>

            {/* Expandable Upload Box */}
            <div className={`bg-surface-container-highest/20 rounded-2xl p-4 sm:p-6 border border-outline-variant/20 flex flex-col gap-6 mb-10 w-full shadow-lg transition-all duration-500 relative overflow-hidden h-auto justify-center`}>
              
              {!(isAnalysed || isAnalyzing) && (
                <div className="flex flex-col items-center justify-center text-center space-y-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(91,140,255,0.15)] ring-1 ring-primary/30">
                    <span className="material-symbols-outlined text-4xl text-primary">analytics</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface">Initiate New Analysis</h3>
                  <p className="text-on-surface-variant max-w-sm">Select a patient and drop an .edf recording to run the EEG detection model.</p>
                </div>
              )}

              {!(isAnalysed || isAnalyzing) ? (
                <div className="flex flex-col gap-6 w-full flex-1 max-w-5xl mx-auto">
                  
                  {/* Top Section: Patient Selection */}
                  <div className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-primary text-[11px] font-bold tracking-[0.15em] uppercase">Select Target Patient</h3>
                      <div className="flex gap-4 items-center">
                        <span className="text-on-surface-variant/60 text-xs italic hidden sm:inline-block">Verify patient identity before proceeding</span>
                        <button onClick={() => setShowAddPatientModal(true)} className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1">+ Add New Patient</button>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select 
                        className="w-full h-[56px] bg-surface-container-highest border border-outline-variant/30 rounded-xl px-4 text-sm text-on-surface outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 appearance-none bg-no-repeat bg-[position:right_1.25rem_center]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%235b8cff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")`,
                          backgroundSize: '20px 20px'
                        }}
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                      >
                        <option value="" disabled>Select a patient</option>
                        {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName} (ID: {p.id})</option>)}
                      </select>
                      <div className="w-[56px] h-[56px] rounded-xl bg-surface-container-high border border-outline-variant/30 flex justify-center items-center shrink-0 overflow-hidden">
                        <span className="material-symbols-outlined text-outline-variant text-[32px]">account_circle</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Dropzone + Analyse Button */}
                  <div className="w-full mx-auto max-w-3xl bg-surface-container border border-outline-variant/30 rounded-2xl flex flex-col relative overflow-hidden px-4 py-8 shadow-lg items-center justify-center mt-2">
                    
                    <div 
                      className="w-full max-w-xl flex flex-col items-center justify-center p-6 cursor-pointer rounded-2xl transition-all text-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files?.[0] && e.dataTransfer.files[0].name.endsWith(".edf")) {
                          setSelectedFile(e.dataTransfer.files[0]);
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input type="file" ref={fileInputRef} className="hidden" accept=".edf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                      
                      {selectedFile ? (
                         <div className="flex flex-col items-center text-sm w-full justify-center gap-3 font-body bg-surface-container-high px-6 py-6 rounded-xl border border-outline-variant/30 mt-2">
                           <span className="material-symbols-outlined text-primary text-[40px]">description</span>
                           <div className="flex flex-col items-center">
                             <span className="max-w-[300px] font-semibold truncate text-center text-on-surface text-lg">{selectedFile.name}</span>
                             <span className="text-xs text-primary uppercase tracking-widest font-mono mt-1">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</span>
                           </div>
                           <button className="text-outline hover:text-error transition-colors flex items-center bg-error/10 hover:bg-error/20 px-4 py-2 rounded-full mt-4" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}><span className="material-symbols-outlined text-[16px] mr-2">close</span> Remove File</button>
                         </div>
                      ) : (
                         <>
                           <div className="w-16 h-16 rounded-full border-[3px] border-dashed border-outline-variant/50 bg-surface-container-highest flex items-center justify-center mb-4">
                             <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(91,140,255,0.2)]">
                               <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">cloud_upload</span>
                             </div>
                           </div>
                           
                           <h4 className="text-on-surface text-xl font-bold mb-6 tracking-wide">Drag and drop EEG raw files</h4>

                           <button 
                             onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                             className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-on-surface font-bold text-sm hover:bg-surface-variant transition-colors flex items-center gap-2 bg-surface-container-lowest"
                           >
                             <span className="material-symbols-outlined text-[20px] text-primary">folder</span> Browse Files
                           </button>
                         </>
                      )}
                    </div>

                    {/* Analyse Button */}
                    <div className="mt-4 w-full max-w-sm flex flex-col items-center shrink-0">
                       <button 
                         onClick={() => {
                            if (!selectedFile) setSelectedFile(new File([], "eeg_recording.edf")); // Mock file auto-fill
                            setTimeout(startAnalysis, 50);
                         }}
                         className="w-full bg-primary text-on-primary-fixed font-bold text-[14px] tracking-wide py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(91,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(91,140,255,0.5)] transition-all hover:bg-primary-dim uppercase hover:-translate-y-0.5"
                       >
                          <span className="material-symbols-outlined text-[20px]">bolt</span> ANALYSE DATA
                       </button>
                       <p className="text-on-surface-variant/70 text-[11px] mt-3 tracking-wide">Analysis is locked until data is ingested.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full h-[56px] flex-1">
                  <div className="relative flex-1 min-w-[200px] h-full">
                    <select 
                      className="w-full h-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-2 px-4 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%236e84b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-no-repeat bg-[position:right_1rem_center] transition-colors hover:border-primary/40 shadow-sm"
                      value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                      <option value="" disabled>Select a patient</option>
                      {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName} (ID: {p.id})</option>)}
                    </select>
                  </div>

                  <div 
                    className="flex-[2] w-full border border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-xl text-center cursor-pointer relative flex flex-row items-center justify-center gap-3 shadow-inner py-2 px-4 h-full"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.[0] && e.dataTransfer.files[0].name.endsWith(".edf")) {
                        setSelectedFile(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept=".edf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    {selectedFile ? (
                       <div className="flex items-center text-sm w-full justify-center gap-2 font-mono flex-row">
                         <span className="material-symbols-outlined text-primary text-[16px]">description</span>
                         <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                         <span className="text-[10px] text-outline uppercase tracking-widest font-mono">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</span>
                         <button className="text-outline hover:text-error transition-colors flex items-center bg-error/10 hover:bg-error/20 p-1.5 rounded-full ml-2" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setIsAnalysed(false); }} title="Remove file"><span className="material-symbols-outlined text-[16px]">close</span></button>
                       </div>
                    ) : (
                       <>
                         <span className="material-symbols-outlined text-primary text-[18px]">cloud_upload</span>
                         <p className="text-on-surface text-sm font-medium inline-block ml-2">Drop .edf file here</p>
                       </>
                    )}
                  </div>

                  <div className="flex-shrink-0 h-full">
                    <button 
                       onClick={() => {
                          if (!selectedFile) setSelectedFile(new File([], "eeg_recording.edf")); // Mock file auto-fill
                          setTimeout(startAnalysis, 50);
                       }}
                       className="h-full bg-primary text-on-primary-fixed font-headline font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(91,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(91,140,255,0.45)] hover:-translate-y-0.5 hover:bg-primary-dim flex justify-center items-center gap-2 px-8 rounded-xl"
                    >
                       <span className="material-symbols-outlined text-[20px]">science</span> 
                       Analyse
                    </button>
                  </div>
                </div>
              )}

              {uploadError && !isAnalysed && !isAnalyzing && <div className="text-error text-xs font-semibold mt-2 text-center flex justify-center items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {uploadError}</div>}
            </div>

            {uploadError && (isAnalysed || isAnalyzing) && <div className="text-error text-xs font-semibold mb-6 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {uploadError}</div>}

            {isAnalyzing && (
              <div className="w-full flex justify-center items-center py-20 px-4 animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center gap-6 p-8 bg-surface-container border border-primary/20 rounded-2xl shadow-xl w-full max-w-lg">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-[4px] border-primary/10 border-t-primary animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="material-symbols-outlined text-primary text-3xl animate-pulse">neurology</span>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold font-headline text-on-surface">Injecting EEG Data...</h2>
                    <p className="text-on-surface-variant text-sm font-mono uppercase tracking-[0.15em] animate-pulse">Running Neural Pattern Recognition Model</p>
                  </div>
                </div>
              </div>
            )}

            {isAnalysed && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                
                {/* Recording Info Row */}
                <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-on-surface-variant bg-surface-container border border-outline-variant/30 px-6 py-4 rounded-xl mb-4">
                  <span className="text-on-surface font-semibold">Patient: {patients.find(p => p.id === selectedPatient) ? `${patients.find(p => p.id === selectedPatient)?.firstName} ${patients.find(p => p.id === selectedPatient)?.lastName}` : (selectedPatient || "Unknown")}</span>
                  <span className="opacity-40">•</span>
                  <span>Duration: 4.5 hours</span>
                  <span className="opacity-40">•</span>
                  <span>Date: 14 Oct 2026</span>
                  <span className="opacity-40">•</span>
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/40 px-2 py-0.5 rounded uppercase text-[10px] font-bold tracking-widest">Seizure Found</span>
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/40 px-2 py-0.5 rounded uppercase text-[10px] font-bold tracking-widest">92.3% Confidence</span>
                </div>

                {/* Alert Banner */}
                <div className="w-full bg-amber-500/10 border-l-[4px] border-amber-500 rounded-r-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md mb-8">
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

                {/* 4 STAT CARDS */}
                <div className="flex flex-col mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Card 1 */}
                    <div className="bg-surface-container border border-outline-variant/10 rounded-2xl p-6 shadow-xl relative flex flex-col items-start hover:scale-[1.02] hover:bg-surface-container-high transition-all duration-300">
                      <div className="w-[42px] h-[42px] bg-cyan-900/10 dark:bg-cyan-900/30 rounded-[10px] flex items-center justify-center">
                        <span className="material-symbols-outlined text-cyan-600 dark:text-cyan-400 text-[20px]">schedule</span>
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full mt-5">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface/90">Recording Duration</h3>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-1 w-full">
                        <div className="text-[32px] font-bold text-cyan-600 dark:text-cyan-400 font-mono tracking-tight leading-none">4.5 hrs</div>
                        <div className="text-[12px] text-on-surface-variant/80 mt-1">256 Hz · 23 channels</div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-surface-container border border-outline-variant/10 rounded-2xl p-6 shadow-xl relative flex flex-col items-start hover:scale-[1.02] hover:bg-surface-container-high transition-all duration-300">
                      <div className="w-[42px] h-[42px] bg-amber-900/10 dark:bg-amber-900/30 rounded-[10px] flex items-center justify-center">
                        <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 text-[20px]">warning</span>
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full mt-5">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface/90">Seizures Found</h3>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-1 w-full">
                        <div className="text-[32px] font-bold text-amber-600 dark:text-amber-500 font-mono tracking-tight leading-none">2</div>
                        <div className="text-[12px] text-on-surface-variant/80 mt-1">In this recording</div>
                       </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-surface-container border border-outline-variant/10 rounded-2xl p-6 shadow-xl relative flex flex-col items-start hover:scale-[1.02] hover:bg-surface-container-high transition-all duration-300">
                      <div className="w-[42px] h-[42px] bg-emerald-900/10 dark:bg-emerald-900/30 rounded-[10px] flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-500 text-[20px]">show_chart</span>
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full mt-5">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface/90">AI Confidence</h3>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-1 w-full">
                        <div className="text-[32px] font-bold text-emerald-600 dark:text-emerald-500 font-mono tracking-tight leading-none">92.3%</div>
                        <div className="text-[12px] text-on-surface-variant/80 mt-1">Peak detection score</div>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-surface-container border border-outline-variant/10 rounded-2xl p-6 shadow-xl relative flex flex-col items-start hover:scale-[1.02] hover:bg-surface-container-high transition-all duration-300">
                      <div className="w-[42px] h-[42px] bg-blue-900/10 dark:bg-blue-900/30 rounded-[10px] flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-500 text-[20px]">web_asset</span>
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full mt-5">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface/90">Windows Analysed</h3>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-1 w-full">
                        <div className="text-[32px] font-bold text-blue-600 dark:text-blue-500 font-mono tracking-tight leading-none">8,100</div>
                        <div className="text-[12px] text-on-surface-variant/80 mt-1">4s windows · 50% overlap</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EEG Timeline Card */}
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl space-y-4 mb-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                     <button onClick={() => setSelectedEventPopup(1)} className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-primary text-sm font-bold rounded-lg border border-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(91,140,255,0.2)] hover:border-primary/50">View Details</button>
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
                     <button onClick={() => setSelectedEventPopup(2)} className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-primary text-sm font-bold rounded-lg border border-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(91,140,255,0.2)] hover:border-primary/50">View Details</button>
                  </div>
                </div>

                {/* Chart.js Confidence Card */}
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl mb-8">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  
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
                <div className="bg-surface-container-highest/30 border border-primary/20 rounded-2xl p-8 shadow-xl mb-8 relative overflow-hidden">
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

              </div>
            )}
          </div>
        )}

        {/* PATIENT ANALYTICS TAB */}
        {activeTab === "patient-analytics" && (
          <div className="max-w-[1240px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 z-10 relative">
            <h2 className="font-headline text-3xl text-on-surface font-bold tracking-tight mb-8">Patient Analytics</h2>
            
            {!analyticsSelectedPatientName ? (
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-outline-variant/20 bg-surface-container/30">
                  <h3 className="font-headline font-bold text-lg text-primary">Recent Recordings</h3>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="text-xs uppercase bg-surface-container/50 text-on-surface border-b border-outline-variant/20 font-label tracking-wide">
                      <tr>
                        <th className="px-6 py-4 font-semibold w-[15%]">Patient ID</th>
                        <th className="px-6 py-4 font-semibold w-[20%]">Name</th>
                        <th className="px-6 py-4 font-semibold w-[20%]">No.of recordings</th>
                        <th className="px-6 py-4 font-semibold w-[15%]">Date</th>
                        <th className="px-6 py-4 font-semibold w-[15%]">Status</th>
                        <th className="px-6 py-4 font-semibold w-[15%]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant font-medium">
                      {patients.map((patient) => {
                        // Find recordings linked to this patient's ID and remove exact file duplicates dynamically to ensure correct counts
                        let patientRecordings = recordingsList.filter(r => r.patient.includes(patient.id));
                        patientRecordings = patientRecordings.filter((rec, index, self) =>
                          index === self.findIndex((t) => t.file === rec.file)
                        );
                        const analysisDoneCount = patientRecordings.filter(r => r.status === 'Processed').length;
                        const lastDate = patientRecordings.length > 0 ? patientRecordings[0].date : 'N/A';
                        
                        let statusText = 'Pending';
                        if (patientRecordings.length > 0 && analysisDoneCount > 0) {
                          statusText = 'Processed';
                        }
                        
                        return (
                          <tr key={patient.id} className="hover:bg-surface-container-highest/30 transition-colors group">
                            <td className="px-6 py-5 text-on-surface font-bold">
                              {patient.id}
                            </td>
                            <td className="px-6 py-5 text-on-surface">
                              {patient.firstName} {patient.lastName}
                            </td>
                            <td className="px-6 py-5">{analysisDoneCount}</td>
                            <td className="px-6 py-5">{lastDate}</td>
                            <td className="px-6 py-5">
                              <span className={`text-[12px] px-2 py-1 rounded border font-bold uppercase tracking-widest ${
                                 statusText === 'Processed' ? 'border-primary/30 text-primary bg-primary/10' :
                                 'border-amber-500/30 text-amber-500 bg-amber-500/10'
                               }`}>
                                 {statusText}
                               </span>
                            </td>
                            <td className="px-6 py-5">
                               <button 
                                 onClick={() => setAnalyticsSelectedPatientName(patient.id)} 
                                 className="text-[13px] text-primary hover:text-primary-dim transition-colors hover:underline font-semibold"
                               >
                                 View History
                               </button>
                            </td>
                          </tr>
                        );
                      })}
                      {patients.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No patients added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (() => {
              const matchedPatient = patients.find(p => p.id === analyticsSelectedPatientName);
              const patientName = matchedPatient ? `${matchedPatient.firstName} ${matchedPatient.lastName}` : analyticsSelectedPatientName;
              let patientRecordings = recordingsList.filter(r => r.patient.includes(analyticsSelectedPatientName as string));
              patientRecordings = patientRecordings.filter((rec, index, self) =>
                index === self.findIndex((t) => t.file === rec.file)
              );
              const totalRecordings = patientRecordings.length;
              
              return (
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 border-b border-outline-variant/20 bg-surface-container/30 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setAnalyticsSelectedPatientName(null)} className="p-2 bg-surface-container hover:bg-surface-variant rounded-full transition-colors flex items-center justify-center text-on-surface-variant group border border-outline-variant/30">
                      <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                    </button>
                    <div>
                      <h3 className="font-headline font-bold text-2xl text-on-surface">{patientName} ({analyticsSelectedPatientName})</h3>
                      <p className="text-xs text-on-surface-variant font-mono mt-1">
                        {matchedPatient ? `${matchedPatient.gender} • ${matchedPatient.age}yrs • Symptoms: ${matchedPatient.symptoms || 'N/A'}` : "Status: Routine Monitoring"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Active
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-8 bg-surface-container-low">
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-container-lowest border border-outline-variant/10 p-5 rounded-xl shadow-lg border-l-[3px] border-l-emerald-500">
                      <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">folder_open</span> Total Recordings</h4>
                      <p className="text-2xl font-mono font-bold text-on-surface mt-2">{totalRecordings}</p>
                      <p className="text-xs text-on-surface-variant mt-1.5 opacity-80">Over 8 months</p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant/10 p-5 rounded-xl shadow-lg border-l-[3px] border-l-primary">
                      <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">history</span> Last Interaction</h4>
                      <p className="text-sm font-medium text-on-surface mt-2">Review discussion with Dr. {doctorLastName}</p>
                      <p className="text-xs text-primary font-mono mt-1.5">Last Week</p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant/10 p-5 rounded-xl shadow-lg border-l-[3px] border-l-amber-500">
                      <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">psychology</span> Primary Condition</h4>
                      <p className="text-sm font-medium text-on-surface mt-2">Temporal Lobe Epilepsy (Suspected)</p>
                      <p className="text-xs text-amber-500 mt-1.5">Monitoring Active</p>
                    </div>
                  </div>

                  {/* Results List */}
                  <div>
                    <h3 className="font-headline font-bold text-lg text-primary mb-4 flex items-center gap-2"><span className="material-symbols-outlined">analytics</span> Analysis History</h3>
                    <div className="space-y-4">
                      {patientRecordings.map((rec, i) => (
                        <div key={i} className="bg-surface-container border border-outline-variant/20 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/40 transition-colors">
                          {i === 0 && <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-amber-500 opacity-80"></div>}
                          
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                                <span className="material-symbols-outlined text-amber-500">show_chart</span>
                              </div>
                              <div>
                                <h4 className="font-headline font-bold text-on-surface text-base">{rec.file}</h4>
                                <p className="text-xs text-on-surface-variant mt-0.5 font-mono">Date Analysed: {rec.date} • Duration: {rec.duration}</p>
                              </div>
                            </div>
                            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/40 px-3 py-1 rounded-lg uppercase text-[10px] font-bold tracking-widest flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[14px]">warning</span> Action Required
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container/50 border border-outline-variant/10 rounded-lg p-5">
                             <div>
                               <p className="text-[10px] text-outline uppercase tracking-widest mb-1.5">Key Finding</p>
                               <p className="text-sm text-on-surface font-semibold flex items-center gap-1">2 Seizure Events</p>
                             </div>
                             <div>
                               <p className="text-[10px] text-outline uppercase tracking-widest mb-1.5">AI Confidence Score</p>
                               <p className="text-sm text-emerald-500 font-extrabold font-mono tracking-tight">92.3%</p>
                             </div>
                             <div>
                               <p className="text-[10px] text-outline uppercase tracking-widest mb-1.5">Processing Status</p>
                               <p className="text-sm text-on-surface font-semibold">{rec.status}</p>
                             </div>
                             <div>
                               <p className="text-[10px] text-outline uppercase tracking-widest mb-1.5">Action</p>
                               <p 
                                 onClick={() => {
                                   if (analyticsSelectedPatientName) setSelectedPatient(analyticsSelectedPatientName);
                                   setSelectedFile(new File([], rec.file));
                                   setIsAnalysed(true);
                                   setActiveTab("dashboard");
                                 }}
                                 className="text-[11px] text-primary font-bold uppercase tracking-wider underline cursor-pointer hover:text-primary-dim transition-colors"
                               >
                                 View Results
                               </p>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )})()}
          </div>
        )}
      </main>
    </div>
  );
}

// Subcomponents definitions

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-[42px] h-[42px]" />;
  
  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center p-2.5 rounded-full border border-outline/20 text-on-surface hover:bg-surface-bright transition-all hover:shadow-[0_0_20px_rgba(91,140,255,0.45)]"
    >
      <span suppressHydrationWarning className="material-symbols-outlined">
        {theme === 'light' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

function NavItem({ id, label, icon, active, onClick }: { id: string, label: string, icon: string, active: boolean, onClick: () => void }) {
  if (active) {
    return (
      <button 
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-primary/10 text-primary rounded-xl border-r-4 border-primary transition-all duration-300 shadow-[inset_4px_0_20px_rgba(91,140,255,0.05)] hover:shadow-[0_0_20px_rgba(91,140,255,0.45)]"
      >
        <span className="material-symbols-outlined">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-on-surface-variant transition-all duration-300 hover:bg-surface-container-high rounded-xl group hover:shadow-[0_0_20px_rgba(91,140,255,0.45)]"
    >
      <span className="material-symbols-outlined transition-transform group-hover:scale-110">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      <div className="absolute left-0 w-1 h-0 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 group-hover:h-8 transition-all duration-300 pointer-events-none group-hover:shadow-[0_0_10px_rgba(91,140,255,0.45)]"></div>
    </button>
  );
}

