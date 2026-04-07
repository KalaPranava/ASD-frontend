import React, { useEffect, useRef } from "react";

interface ProcessingViewProps {
  state: string;
  progress: number;
  step: number;
  logs: string[];
  timeLeft: number;
  file?: string;
  patient?: string;
  onCancel: () => void;
}

const STEPS = [
  { name: "Uploading", subtitle: "Transferring to secure server" },
  { name: "Preprocessing", subtitle: "Filtering and windowing signal" },
  { name: "AI Analysis", subtitle: "CNN and Transformer inference" },
  { name: "Generating Report", subtitle: "Building clinical PDF" },
];

export default function ProcessingView({ state, progress, step, logs, timeLeft, file, patient, onCancel }: ProcessingViewProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (state !== "processing") return null;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-[640px] bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20 shadow-xl flex flex-col items-center">
        
        <div className="font-mono text-xs text-outline mb-8 text-center bg-surface-container px-4 py-1.5 rounded-full inline-flex">
          <span className="text-on-surface-variant font-medium mr-2">{patient || "Patient"}</span> 
          <span className="opacity-50">|</span> 
          <span className="ml-2">{file || "eeg_recording.edf"}</span>
        </div>

        <div className="relative w-[72px] h-[72px] mb-6">
          <div className="absolute inset-0 border-4 border-surface-container-highest rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="absolute inset-0 material-symbols-outlined flex items-center justify-center text-primary text-[28px] animate-pulse">memory</span>
        </div>

        <h2 className="text-2xl font-headline font-bold text-primary mb-10">{STEPS[step]?.name || "Finalizing"}</h2>

        <div className="w-full flex justify-between items-center relative mb-12 px-2">
          <div className="absolute left-[20px] top-[20px] bottom-[20px] w-0.5 bg-outline-variant/30 -z-10 hidden sm:block"></div>
          <div className="flex flex-col gap-6 w-full">
            {STEPS.map((sData, idx) => {
              const isPast = idx < step;
              const isCurrent = idx === step;
              
              return (
                <div key={idx} className="flex items-center gap-4 bg-surface-container-highest/50 p-4 rounded-2xl relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 shadow-md ${
                    isPast ? "bg-emerald-500 text-white shadow-emerald-500/20" : 
                    isCurrent ? "bg-surface-container-highest border-2 border-primary" : 
                    "bg-surface-container-lowest text-outline border border-outline-variant/50"
                  }`}>
                    {isPast ? (
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    ) : isCurrent ? (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="font-mono text-xs font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-headline font-bold text-sm ${isCurrent ? "text-primary" : isPast ? "text-on-surface" : "text-on-surface-variant"}`}>
                      {sData.name}
                    </div>
                    <div className="text-xs text-outline font-body truncate">{sData.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-headline font-bold">Analysis Progress</span>
            <span className="font-mono text-sm font-medium text-primary">{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-secondary to-primary" 
              style={{ width: `${progress}%`, transition: "width 0.2s linear" }}
            ></div>
          </div>
        </div>

        <div className="w-full flex justify-end mb-4 font-mono text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 self-end w-max">
           {m} min {s.toString().padStart(2, '0')} sec remaining
        </div>

        <div 
          ref={logContainerRef}
          className="w-full max-h-[160px] overflow-y-auto bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 font-mono text-[10px] space-y-2 mb-8"
        >
          {logs.map((log, i) => {
            const timeMap = log.split(" ")[0];
            const msgMap = log.substring(timeMap.length + 1);
            return (
              <div key={i} className="flex gap-3">
                <span className="text-primary/70 shrink-0">{timeMap}</span>
                <span className="text-outline">{msgMap}</span>
              </div>
            );
          })}
          {step < 3 && <div className="flex gap-3 animate-pulse opacity-50"><span className="text-primary/70 shrink-0">--:--:--</span><span className="text-outline">...</span></div>}
        </div>

        <button 
          onClick={onCancel}
          className="text-error font-medium text-sm hover:text-error-dim transition-colors flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">cancel</span>
          Cancel Analysis
        </button>

      </div>
    </div>
  );
}
