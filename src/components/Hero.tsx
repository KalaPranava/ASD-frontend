import type { FC } from 'react';
import Image from 'next/image';

const Hero: FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-8 min-h-screen flex items-center bg-surface overflow-hidden">
      {/* Background Abstract Graphic */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
         <Image 
            src="/hero_background.png" 
            alt="Medical AI Console" 
            fill 
            className="object-cover" 
            priority 
         />
      </div>
      
      {/* Cyan Leak Effect (Light reflecting off lens) */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] glow-leak -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mt-[-5%]">
        <div className="flex flex-col items-start gap-10">
          
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-highest text-primary text-label-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-[synaptic-pulse_3s_infinite]" />
            AI Status: Active
          </span>
          
          <h1 className="text-display-lg text-on-surface max-w-4xl text-left">
            Precision Optics & <br/> 
            <span className="text-primary tracking-tight font-display">Neural Intelligence.</span>
          </h1>
          
          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            The Synaptic Lens platform powers high-definition medical analysis through atmospheric depth computation. 
            Replace generic interfaces with the hyper-luminescent speed of AI-driven diagnostics designed beyond the flat web.
          </p>
          
          <div className="flex gap-4 mt-4">
            {/* The Synaptic Pulse Primary Button */}
            <button className="bg-gradient-to-r from-secondary to-primary-container text-on-primary-fixed shadow-[0_4px_20px_rgba(217,70,239,0.04),0_20px_40px_rgba(0,0,0,0.4)] rounded-full px-8 py-4 font-bold hover:scale-[1.02] transition-transform text-lg">
              Initialize Console
            </button>
            
            {/* Secondary Ghost Button */}
            <button className="border border-outline/20 text-on-surface hover:bg-surface-bright hover:border-b-primary hover:border-b-2 rounded-full px-8 py-4 font-bold transition-all text-lg flex items-center gap-2">
              View Technology
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
