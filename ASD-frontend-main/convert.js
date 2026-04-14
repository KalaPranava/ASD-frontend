const fs = require('fs');

let html = fs.readFileSync('stitch_raw.html', 'utf8');

// Extract body inner content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Remove script tags if any inside body
bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Convert class to className
bodyContent = bodyContent.replace(/class="/g, 'className="');
// Fix tabindex
bodyContent = bodyContent.replace(/tabindex="/g, 'tabIndex="');
// Fix viewBox
bodyContent = bodyContent.replace(/viewbox="/g, 'viewBox="');
// Fix preserveaspectratio
bodyContent = bodyContent.replace(/preserveaspectratio="/g, 'preserveAspectRatio="');

// Self closing tags fix
bodyContent = bodyContent.replace(/<img([^>]+[^\/])>/gi, '<img$1 />');
bodyContent = bodyContent.replace(/<br>/gi, '<br />');
bodyContent = bodyContent.replace(/<hr([^>]*)>/gi, '<hr$1 />');
bodyContent = bodyContent.replace(/<input([^>]+[^\/])>/gi, '<input$1 />');

// Extract the Navbar section
const navMatch = bodyContent.match(/<!-- Top Navigation Bar -->\s*(<nav[\s\S]*?<\/nav>)/i);
const navSection = navMatch ? navMatch[1] : '';

// We need to inject our logo into the navSection.
// We'll replace the `<div className="flex items-center gap-3">...</div>` with our logo markup.
// But we'll just leave a comment and I'll do it manually.

bodyContent = bodyContent.replace(/<!-- Top Navigation Bar -->\s*<nav[\s\S]*?<\/nav>/i, '<Navbar />');

// Replace Hero Section HTML with <Hero /> (Optional, or maybe I should just keep Stitch's Hero and replace my entire page)
// The user said "use exactly the stitch generated template for landing page apart from the neurolens logo".
// So I will just use the entire Stitch generated template, but put the Nav in a modular component.

fs.writeFileSync('converted.jsx', bodyContent);
console.log('Done converting body payload.');
