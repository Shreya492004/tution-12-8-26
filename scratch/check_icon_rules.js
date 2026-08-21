const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const styleTags = [...content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  
  styleTags.forEach(st => {
    const css = st[1];
    const regex = /([^{}]+)\{([^}]+)\}/g;
    let m;
    while ((m = regex.exec(css)) !== null) {
      const sel = m[1].trim();
      const body = m[2].trim();
      if (/\bi\b|\bfeather\b|\bfa\b|\bicon\b|\.contact-button|\.social/i.test(sel)) {
        if (/(top|bottom|margin-top|margin-bottom|margin-right|margin-left|transform|vertical-align|display|align-items)\s*:/i.test(body)) {
          console.log(`[${file}] ${sel} {\n  ${body.replace(/\s+/g, ' ')}\n}`);
        }
      }
    }
  });
});
