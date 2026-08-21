const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/<div class="popup-mobile-menu">([\s\S]*?)(?:<!-- Start|\r?\n\s*\r?\n\s*<(?:div class="rbt-|div class="slider-|main|section))/i);
  if (match) {
    const section = match[0];
    const opens = (section.match(/<div\b/gi) || []).length;
    const closes = (section.match(/<\/div>/gi) || []).length;
    console.log(`${f.padEnd(35)} popup-mobile-menu: open=${opens}, close=${closes}, diff=${opens - closes}`);
  }
});
