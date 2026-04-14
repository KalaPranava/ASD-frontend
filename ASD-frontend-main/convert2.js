const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

// replace HTML comments with JSX comments
page = page.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed page HTML comments.');

let glob = fs.readFileSync('src/app/globals.css', 'utf8');
const addStyles = `
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
.glass-nav { background: rgba(9, 14, 28, 0.6); backdrop-filter: blur(24px); }
.hero-gradient-text { background: linear-gradient(90deg, #00ffff, #669dff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.synaptic-pulse { background: linear-gradient(135deg, #669dff 0%, #00ffff 100%); }
.eeg-bar { width: 3px; background-color: #00ffff; border-radius: 99px; display: inline-block; margin: 0 1px; }
`;
if (!glob.includes('.eeg-bar')) {
  fs.writeFileSync('src/app/globals.css', glob + addStyles);
  console.log('Added styles to globals.css');
}
