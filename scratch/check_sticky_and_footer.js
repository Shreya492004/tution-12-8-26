const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');
const custom = fs.readFileSync('assets/css/custom-ui.css', 'utf8');

function findRules(content, name) {
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('rbt-sticky') || l.includes('rbt-header-wrapper') || l.includes('rbt-header-sticky') || l.includes('header-sticky')) {
      console.log(`${name}:${idx+1}: ${l.trim().substring(0, 120)}`);
    }
  });
}

console.log('=== CSS RULES ===');
findRules(css, 'style.css');
findRules(custom, 'custom-ui.css');

console.log('\n=== HTML HEADERS AND FOOTERS ===');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasStickyPlaceholder = c.includes('rbt-sticky-placeholder');
  const hasHeaderWrapper = c.includes('rbt-header-wrapper');
  const headerTag = (c.match(/<header[^>]*>/i) || [''])[0];
  const bodyTag = (c.match(/<body[^>]*>/i) || [''])[0];
  const footerTag = (c.match(/<footer[^>]*>/i) || [''])[0];
  console.log(`${f.padEnd(35)} body: ${bodyTag.substring(0, 30)} | header: ${headerTag.substring(0, 40)} | hasPlaceholder: ${hasStickyPlaceholder} | hasWrapper: ${hasHeaderWrapper}`);
});
