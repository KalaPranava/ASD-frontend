const fs = require('fs');

let converted = fs.readFileSync('converted.jsx', 'utf8');

// Add ids for smooth scrolling
converted = converted.replace(
  '<section className="py-24 bg-surface">',
  '<section id="how-it-works" className="py-24 bg-surface">'
);

converted = converted.replace(
  '<section className="py-24 bg-surface-container-low relative">',
  '<section id="about" className="py-24 bg-surface-container-low relative">'
);

// Fix styles in SVG tags (since it's JSX, style must be an object)
converted = converted.replace(
  '<stop offset="0%" style="stop-color:#00FFFF;stop-opacity:1"></stop>',
  '<stop offset="0%" stopColor="#00FFFF" stopOpacity={1}></stop>'
);
converted = converted.replace(
  '<stop offset="100%" style="stop-color:#090e1c;stop-opacity:1"></stop>',
  '<stop offset="100%" stopColor="#090e1c" stopOpacity={1}></stop>'
);

// Fix HTML comments
converted = converted.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

const pageContent = `import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      ${converted}
    </main>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageContent);
console.log('Successfully built page.tsx');
