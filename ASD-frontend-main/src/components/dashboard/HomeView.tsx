import React from "react";

interface HomeViewProps {
  state: string;
  recordings: any[];
  onViewResults: () => void;
  // Passing these so the dropzone works
  selectedPatient: string;
  setSelectedPatient: (p: string) => void;
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
  onAnalyze: () => void;
  uploadError: string;
  patients: { id: string; name: string }[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function HomeView({
  state,
  recordings,
  onViewResults,
  selectedPatient,
  setSelectedPatient,
  selectedFile,
  setSelectedFile,
  onAnalyze,
  uploadError,
  patients,
  fileInputRef,
}: HomeViewProps) {
  if (state !== "home") return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-[1240px] mx-auto">
      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Total Recordings</h3>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl">grid_view</span>
          </div>
          <div className="text-4xl font-headline font-bold mb-2">{recordings.length || 12}</div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Seizures Detected</h3>
            <span className="material-symbols-outlined text-amber-500 bg-amber-500/10 p-2 rounded-xl">warning</span>
          </div>
          <div className="text-4xl font-headline font-bold text-amber-500 mb-2">8</div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Clear EEGs</h3>
            <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-xl">check_circle</span>
          </div>
          <div className="text-4xl font-headline font-bold text-emerald-500 mb-2">4</div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-secondary/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Avg Analysis Time</h3>
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-xl">schedule</span>
          </div>
          <div className="text-3xl font-mono font-bold text-primary mb-3 mt-1">4m 12s</div>
        </div>
      </div>

      {/* COMPACT UPLOAD ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dropzone Compact */}
        <div className="col-span-1 lg:col-span-2 bg-surface-container-highest/20 rounded-2xl p-4 border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <select 
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%236e84b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-no-repeat bg-[position:right_1rem_center]"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="" disabled>Select a patient</option>
              {patients.map(p => <option key={p.id} value={p.name}>{p.name} (ID: {p.id})</option>)}
            </select>
          </div>

          <div 
            className="flex-1 w-full border border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors rounded-xl p-3 text-center cursor-pointer relative flex items-center justify-center gap-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0] && e.dataTransfer.files[0].name.endsWith(".edf")) {
                setSelectedFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
               <div className="flex items-center gap-2 font-mono text-xs w-full justify-between">
                 <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                 <span className="truncate">{selectedFile.name}</span>
                 <button className="text-outline hover:text-error ml-2" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}><span className="material-symbols-outlined text-[16px]">close</span></button>
               </div>
            ) : (
               <>
                 <span className="material-symbols-outlined text-primary text-[18px]">cloud_upload</span>
                 <span className="text-sm text-outline font-medium">Drop .edf file or Click</span>
               </>
            )}
          </div>

          <button 
             onClick={onAnalyze}
             className="px-6 py-3 w-full sm:w-auto bg-primary text-on-primary-fixed rounded-xl font-headline font-bold hover:bg-primary-dim transition-all duration-300 shadow-[0_4px_15px_rgba(91,140,255,0.3)] hover:shadow-[0_6px_25px_rgba(91,140,255,0.45)] hover:-translate-y-0.5"
          >
            Analyse
          </button>
        </div>

        {/* Neural Activity Stream */}
        <div className="col-span-1 border border-outline-variant/20 bg-surface-container-low rounded-2xl p-5 shadow-lg relative overflow-hidden">
           <div className="flex justify-between items-center mb-5">
              <h3 className="font-headline font-bold text-sm">Neural Activity Stream</h3>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">ON</span>
              </div>
           </div>

           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-on-surface">Gamma Burst</span><span className="font-mono text-primary animate-pulse text-opacity-80">75%</span></div>
               <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-primary to-secondary relative w-[75%] rounded-r-full"></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-on-surface">Alpha Rhythm</span><span className="font-mono text-secondary animate-pulse text-opacity-80">45%</span></div>
               <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-secondary to-secondary relative w-[45%] rounded-r-full"></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-on-surface">Theta Phase</span><span className="font-mono text-amber-500 animate-pulse text-opacity-80">30%</span></div>
               <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 relative w-[30%] rounded-r-full"></div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {uploadError && <div className="text-error text-xs font-semibold px-4">{uploadError}</div>}

      {/* RECENT RECORDINGS TABLE */}
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
          <h3 className="font-headline font-bold text-lg text-primary">Recent Recordings</h3>
          <button className="text-sm font-semibold text-outline hover:text-primary transition-colors hover:underline">View All</button>
        </div>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-full">
            <thead className="text-xs uppercase bg-surface-container/50 text-outline border-b border-outline-variant/20 font-label tracking-wide">
              <tr>
                <th className="px-6 py-4 font-semibold">Patient</th>
                <th className="px-6 py-4 font-semibold">File</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {recordings.map((rec, idx) => (
                <tr key={idx} className="hover:bg-surface-container-highest/30 transition-colors group">
                  <td className="px-6 py-4 font-medium">{rec.patient}</td>
                  <td className="px-6 py-4 font-mono text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-outline">description</span>
                    {rec.file}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{rec.date}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{rec.duration}</td>
                  <td className="px-6 py-4">
                     <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                       rec.status === 'Seizure Found' ? 'border-amber-500 text-amber-500 bg-amber-500/10' :
                       rec.status === 'All Clear' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' :
                       'border-primary text-primary bg-primary/10'
                     }`}>
                       {rec.status}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     {rec.status === 'Processing' ? (
                       <button disabled className="px-4 py-1.5 rounded-lg text-xs font-bold text-outline bg-surface-container cursor-not-allowed">Wait</button>
                     ) : (
                       <button onClick={onViewResults} className="px-4 py-1.5 rounded-lg text-xs font-bold text-on-primary-fixed bg-primary hover:bg-primary-dim transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-[0_2px_10px_rgba(91,140,255,0.3)] hover:shadow-[0_4px_15px_rgba(91,140,255,0.45)] hover:-translate-y-0.5 border border-primary/20">View</button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recordings.length === 0 && (
            <div className="w-full p-8 text-center text-outline text-sm">No recordings found. Please upload a file.</div>
          )}
        </div>
      </div>
    </div>
  );
}
