const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const targetStr = '<div className="group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/10">';

const replacementStr = `<div className="relative overflow-hidden group p-8 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/10 hover:shadow-[0_10px_40px_-15px_rgba(0,255,255,0.3)]">
<span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center shadow-[0_0_25px_8px_rgba(0,255,255,0.8)]"></span>`;

page = page.replaceAll(targetStr, replacementStr);

fs.writeFileSync('src/app/page.tsx', page);
console.log('Successfully injected tubelight glow to the 6 feature cards.');
