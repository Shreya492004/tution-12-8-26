const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const headMatch = c.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    const cssLinks = (headMatch[1].match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).map(l => {
      const href = (l.match(/href=["']([^"']+)["']/) || ['',''])[1];
      return href;
    });
    console.log(`${f.padEnd(35)} CSS: ${cssLinks.join(', ')}`);
  }
});
