const fs = require('fs');

const files = ['src/app/page.tsx', 'src/components/Navbar.tsx'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace text-primary-container with text-primary for correct light mode contrast
  content = content.replace(/\btext-primary-container\b/g, 'text-primary');

  fs.writeFileSync(file, content);
  console.log(`Replaced text-primary-container -> text-primary in ${file}`);
}
