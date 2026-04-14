const fs = require('fs');

const files = ['src/app/page.tsx', 'src/components/Navbar.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace text-white with text-on-surface
  content = content.replace(/\btext-white\b/g, 'text-on-surface');
  
  // Replace text-[#a6aabf] with text-on-surface-variant
  content = content.replace(/text-\[\#a6aabf\]/g, 'text-on-surface-variant');
  
  // Replace text-[#00FFFF] with text-primary-container
  content = content.replace(/text-\[\#00FFFF\]/g, 'text-primary-container');
  
  // Replace border-[#00FFFF] with border-primary-container
  content = content.replace(/border-\[\#00FFFF\]/g, 'border-primary-container');
  
  // Replace border-[#181f33] with border-outline-variant
  content = content.replace(/border-\[\#181f33\]/g, 'border-outline-variant');

  fs.writeFileSync(file, content);
  console.log(`Fixed colors in ${file}`);
}
