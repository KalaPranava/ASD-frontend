const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);
files.forEach(file => {
   const content = fs.readFileSync(file, 'utf8');
   if (content.includes('rgba(0,255,255')) {
       // Replace all rgba(0,255,255, with rgba(217,70,239,
       const newContent = content.replace(/rgba\(0,255,255/g, 'rgba(217,70,239');
       fs.writeFileSync(file, newContent);
       console.log('Updated: ' + file);
   }
});
console.log('Done replacing glow tubelight colors.');
