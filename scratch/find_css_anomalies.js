const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const styles = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  
  styles.forEach((st, idx) => {
    // Check for syntax errors like a:hover, } or similar
    if (/,[ \t\r\n]*\}/.test(st)) {
      console.log(`[SYNTAX ERROR] in ${f} (style #${idx+1}): hanging comma before closing brace`);
    }
    // Check for login-dropdown overrides with low z-index
    if (/z-index:\s*999/i.test(st)) {
      console.log(`[LOW Z-INDEX] in ${f} (style #${idx+1}): z-index: 999 in style tag`);
    }
    // Check for 17px sidebar overrides
    if (/\.dashboard-mainmenu[^{]*\{[^}]*font-size:\s*17px/i.test(st)) {
      console.log(`[17px SIDEBAR] in ${f} (style #${idx+1})`);
    }
  });
});
