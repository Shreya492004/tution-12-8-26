const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(filename => {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  let stack = [];
  let mismatches = 0;
  
  lines.forEach((line, lineNo) => {
    const regex = /<(\/)?([a-zA-Z0-9\-]+)([^>]*)>/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const isClosing = !!m[1];
      const tag = m[2].toLowerCase();
      const raw = m[0];
      
      if (['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'path', 'g', 'circle', 'svg', 'polygon', 'defs', 'rect', 'tbody', 'thead', 'tr', 'td', 'th', 'col', 'colgroup'].includes(tag)) {
        continue;
      }
      if (raw.endsWith('/>')) {
        continue;
      }
      
      if (!isClosing) {
        stack.push({ tag, lineNo: lineNo + 1, line: line.trim() });
      } else {
        if (stack.length === 0) {
          mismatches++;
        } else {
          const last = stack.pop();
          if (last.tag !== tag) {
            mismatches++;
          }
        }
      }
    }
  });
  
  console.log(`${filename.padEnd(35)} mismatches: ${mismatches}, unclosed at end: ${stack.length}`);
});
