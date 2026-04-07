import React from "react";

export default function NeuralReportsView() {
  return (
    <div className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] mt-4">
      
{/* Cyan Leak Background Decor */}
<div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
<div className="fixed bottom-0 left-[240px] w-[300px] h-[300px] bg-secondary/5 blur-[100px] rounded-full -z-10"></div>
{/* Header Section */}
<header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-2">Diagnostic Archives</h2>
<h1 className="text-5xl font-headline font-bold text-on-surface tracking-tighter">Neural <span className="text-primary">Reports</span></h1>
</div>
<div className="flex items-center gap-3">
<button className="p-3 bg-surface-container-high rounded-full border border-outline-variant/10 hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(217,70,239,0.8)] transition-all">
<span className="material-symbols-outlined hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]">filter_list</span>
</button>
</div>
</header>
{/* Bento Grid Layout for Reports */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Card 1: Elevated Focus */}
<div className="col-span-1 md:col-span-2 bg-surface-container-high rounded-lg p-8 relative overflow-hidden group hover:bg-surface-variant transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
<div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50 group-hover:opacity-100"></div>
<div className="flex justify-between items-start mb-8">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary text-sm">emergency</span>
<span className="text-on-surface-variant text-xs font-label tracking-widest uppercase">High Priority Pulse</span>
</div>
<h3 className="text-2xl font-headline font-bold">Patient Case: NE-4922</h3>
<p className="text-on-surface-variant mt-1">Deep REM Sleep Analysis - Phase IV Recovery</p>
</div>
<div className="text-right">
<div className="text-primary text-4xl font-headline font-bold tracking-tighter">98.4%</div>
<div className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Stability Index</div>
</div>
</div>
<div className="h-48 w-full bg-[#0d1323] rounded-xl overflow-hidden mb-6 relative border border-outline-variant/10">
<img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" data-alt="highly detailed digital visualization of complex EEG brainwave data with glowing cyan and neon blue lines against a dark navy background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbF2lOKv5p286MTWc3xIKYo0DMjsTm6UxNWFyYfNm1qe4ozqAIov8pwd7WLUxYZ8OwBrXP-1u4_IRfm388WrGEOOWhWvECkmBto2gfcNnZiDijWgPKuyxdI-WV2Xy_4ZHsH56P3pX0PWWTYn6hrMqVoQx59w1-nnMLlBchpNilpw7T1zn0JVBT9QBOLmWRHw98A013BeUteyCLDz8iyKsKhgEXw71moaGJvgUbQX5aYhpPZ1H8zi4eE11J7SYRIAoxQU_j9Pmzj-tH"/>
<div className="absolute inset-0 bg-gradient-to-t from-[#0d1323] to-transparent opacity-40"></div>
<div className="absolute bottom-4 left-4 flex gap-4">
<div className="px-3 py-1 bg-surface-container/80 backdrop-blur-md rounded-full text-[10px] text-on-surface border border-outline-variant/20">Duration: 04h 12m</div>
<div className="px-3 py-1 bg-surface-container/80 backdrop-blur-md rounded-full text-[10px] text-on-surface border border-outline-variant/20">Sensor: Cortex-V3</div>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex -space-x-2">
<img alt="Clinician 1" className="w-8 h-8 rounded-full border-2 border-surface-container-high" data-alt="professional portrait of a young medical scientist with glasses in a tech-focused clinic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmgvZjVPgJj_GSGBAfR3rNLGp7BhbilfQ3aCSAFEpPMBXTUT1WgEOkmoVVEuSic56yjt-ZUybsySlY7c5CIK_W_KpmNZM4lzuyE3_SfCiRXjlMe0u929qeCUTuP0-aZHTTW85q1zIpkZBRq_sqndJk_CSGeJpzecQfscnx0eopNTvGEHjdnCsLZGQ_29vr9Ob-anrxgJO7S4kMK0AaCxs0SGb8Cm64-s5VCAxkubY4zxX7oBPv3v1ElCAmQQ3CFSDKGNlKwOyySMen"/>
<img alt="Clinician 2" className="w-8 h-8 rounded-full border-2 border-surface-container-high" data-alt="mature neurological expert in a lab coat with a warm expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiR1YMIGZf334I261xqTRml4XDdd7ZRKcmiUenEcH3zgFIh181L1nBM39mC9sjSJFT4hTbjtcJhtOuclahqInIi0zJT-bYoe9e36UImWUWUfiG0lGDFuvad5TtX84chJZTFjAhVCijvNYhRpDlouWgzVyEoa2Z_pUNPGNO7xPrAy2AZ6rNvGOJDu17S5nU88E_5fJiX5c4ZvibX6kKYAqzeG3spQi0fr-RvXcL8GM6EGz1O9QVThli4wxWUZxUUTtTyqvkYNtazwLr"/>
<div className="w-8 h-8 rounded-full border-2 border-surface-container-high bg-surface-bright flex items-center justify-center text-[10px] font-bold">+2</div>
</div>
<div className="text-on-surface-variant text-sm font-medium">Recorded: Oct 24, 2023 • 03:14 AM</div>
</div>
</div>
{/* Card 2: Standard Unit */}
<div className="bg-surface-container rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 border-t border-primary/5 group">
<div className="flex justify-between items-start mb-6">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">waves</span>
</div>
<div className="text-right">
<div className="text-on-primary-container text-xl font-headline font-bold">82.1%</div>
<div className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Stability</div>
</div>
</div>
<h4 className="text-lg font-headline font-bold mb-1">Theta Flux Audit</h4>
<p className="text-on-surface-variant text-sm mb-6">Patient ID: AS-991</p>
<div className="h-24 w-full bg-[#0d1323] rounded-lg mb-4 overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover mix-blend-screen opacity-60" data-alt="abstract neural activity eeg wave visualization with sharp jagged lines and soft glow in electric cyan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA5SBkkE5hWl5fLf-tMWYlXqMqgHmg926FJQJscya-ePYHud8N8ZA5bpz8v246GpKY0-_L6IfZMls_4QplIUFCkRfNyY5rKl04eZZ7xxDFIxJm-4sc_lKkmGxTewd-ys_Le2YR7rNOZYOZLbDtDndiGdP_zAc0CTnOEMrTEiYYJRC-i7BO8sHou1SgHv1xVIjGPOmy26pZMbzIOaiyj9EtPiLK9_cLNXdCkmAndHhxnMSK_V5EyWVkaKpIVI5vyPAWd0bFuoFP17Va"/>
</div>
<div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
<span>Oct 22, 2023</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span> 52m 10s</span>
</div>
</div>
{/* Card 3: Standard Unit */}
<div className="bg-surface-container rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 border-t border-primary/5 group">
<div className="flex justify-between items-start mb-6">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">insights</span>
</div>
<div className="text-right">
<div className="text-on-primary-container text-xl font-headline font-bold">94.5%</div>
<div className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Stability</div>
</div>
</div>
<h4 className="text-lg font-headline font-bold mb-1">Gamma Wave Sync</h4>
<p className="text-on-surface-variant text-sm mb-6">Patient ID: BX-112</p>
<div className="h-24 w-full bg-[#0d1323] rounded-lg mb-4 overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover mix-blend-screen opacity-60" data-alt="smooth flowing digital waves representing brain activity in dark teal and bright cyan gradients" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQn5bc595Tzsr8M5fXUzODnhDpCCvAFiUa-j5lkwRuW8dWmn6OZgMOT3ii2Uhy7fmJq_6kY0bZzMCoKnYh976PbaEsRl3fyzTFTjp4E1xk3cfIBS8WnwQAutXt3Kv2tp29xLnRTZemXOkdA240mLTtLLV4TffhncSXlpvrlw3Z9oBMvDuVE2GvwVqaRSe8_Ld28H8J2Ux7JvalvCvtL9s0NlU0DNFlPplsHyb7QY_o6VsxCxnF7rwxKSeadkerHhCWgTOUQhdaf4YH"/>
</div>
<div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
<span>Oct 21, 2023</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span> 01h 45m</span>
</div>
</div>
{/* Card 4: Standard Unit */}
<div className="bg-surface-container rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 border-t border-primary/5 group">
<div className="flex justify-between items-start mb-6">
<div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
<span className="material-symbols-outlined">warning</span>
</div>
<div className="text-right">
<div className="text-error text-xl font-headline font-bold">41.9%</div>
<div className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Stability</div>
</div>
</div>
<h4 className="text-lg font-headline font-bold mb-1">Delta Spike Trace</h4>
<p className="text-on-surface-variant text-sm mb-6">Patient ID: CR-552</p>
<div className="h-24 w-full bg-[#0d1323] rounded-lg mb-4 overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover mix-blend-screen opacity-60" data-alt="erratic and sharp digital frequency spikes with a red and orange glow indicating abnormal activity against a dark navy field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Y_hy8zPXtt0H1NxTKYKaG0lwEerg-WuQcviy3kPdpXkP0RL-BKkxUQAJXGZdRyBcq34yLZpLfYoGSYY-ncrg4B9OEqtNvmxMKBpSdDNCdpLl5k664nYiBInHdeXRf0-JHeeAq0hWjFjL6HnpUfa4kWVzRUwjaB-UKEe-Ed5X0_0LiRdaPjgMLGq0OhqLzXkw-qorMX-Fxk3A64oZbm1t9O80fMd7sajLOgFsFkexruli3Gy4KlxmdkLHKppU1aWB9ZebBASOWt28"/>
</div>
<div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
<span>Oct 20, 2023</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span> 15m 33s</span>
</div>
</div>
{/* Card 5: Standard Unit */}
<div className="bg-surface-container rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300 border-t border-primary/5 group">
<div className="flex justify-between items-start mb-6">
<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">psychology</span>
</div>
<div className="text-right">
<div className="text-on-primary-container text-xl font-headline font-bold">99.2%</div>
<div className="text-[9px] uppercase tracking-tighter text-on-surface-variant">Stability</div>
</div>
</div>
<h4 className="text-lg font-headline font-bold mb-1">Baseline Cognition</h4>
<p className="text-on-surface-variant text-sm mb-6">Patient ID: DM-008</p>
<div className="h-24 w-full bg-[#0d1323] rounded-lg mb-4 overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover mix-blend-screen opacity-60" data-alt="perfectly rhythmic and soft pulsing sine waves in a calming cyan glow on a black digital display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDenBaU8NMNBW-QlphIOjkaaHOrcxqgD8yGF-5lrssCrPVIA02VUnZgfn2eJwwV-t2yH29azoMjxYz0rSp17NhPST_W3sIz0yQdqoIxtn2X6cIXMPR_-ED_g3xh3MDZ7GJM5ge4Y9nqkMet2ST9CESxNLKgCnEZdNSJYuSTp0YUSO1worwSapZqVcPk5rdkaxToSYMoWN59a3dIhkHDlQrO2oLEiMLP3peDSwxsUSF3qvbsrE18xEJHLB05LLLJw0zQBucGX7QlrTZU"/>
</div>
<div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
<span>Oct 20, 2023</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span> 08h 00m</span>
</div>
</div>

</div>


    </div>
  );
}
