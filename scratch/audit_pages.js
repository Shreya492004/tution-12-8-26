const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Total HTML files: ${files.length}`);

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasCustomUi = c.includes('custom-ui.css');
  const hasHeader = c.includes('<header');
  const hasFooter = c.includes('<footer');
  const headerClass = (c.match(/<header[^>]*class=["']([^"']*)["'][^>]*>/i) || ['','NONE'])[1];
  const bodyClass = (c.match(/<body[^>]*class=["']([^"']*)["'][^>]*>/i) || ['','NONE'])[1];
  
  console.log(`${f.padEnd(35)} customUi: ${hasCustomUi} | header: ${hasHeader} (${headerClass}) | footer: ${hasFooter} | body: ${bodyClass}`);
});
