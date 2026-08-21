const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match selectors that target i, icon, svg, or classes with icon
  const matches = [...content.matchAll(/([^{};]+(?:i\b|icon|feather|svg|btn-icon|contact-button|badge)[^{}]*)\{([^}]+)\}/gi)];
  if (matches.length > 0) {
    console.log(`\n=== ${file} (${matches.length} icon rules) ===`);
    matches.forEach(m => {
      const sel = m[1].trim();
      const body = m[2].trim().replace(/\s+/g, ' ');
      // filter to interesting rules
      if (/transform|margin|padding|vertical-align|top|bottom|display|align-items/i.test(body)) {
        console.log(`  ${sel} { ${body} }`);
      }
    });
  }
});
