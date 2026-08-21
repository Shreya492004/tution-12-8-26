const fs = require('fs');

function traceTags(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  let stack = [];
  
  lines.forEach((line, lineNo) => {
    // extract tags with regex
    const regex = /<(\/)?([a-zA-Z0-9\-]+)([^>]*)>/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const isClosing = !!m[1];
      const tag = m[2].toLowerCase();
      const raw = m[0];
      
      // ignore self-closing / void tags
      if (['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'path', 'g', 'circle', 'svg', 'polygon', 'defs', 'rect'].includes(tag)) {
        continue;
      }
      if (raw.endsWith('/>')) {
        continue;
      }
      
      if (!isClosing) {
        stack.push({ tag, lineNo: lineNo + 1, line: line.trim() });
      } else {
        if (stack.length === 0) {
          console.log(`[${filename}] Extra closing </${tag}> at line ${lineNo + 1}: ${line.trim()}`);
        } else {
          const last = stack.pop();
          if (last.tag !== tag) {
            console.log(`[${filename}] Tag mismatch at line ${lineNo + 1}: expected </${last.tag}> (opened at ${last.lineNo}: "${last.line}"), but got </${tag}>`);
          }
        }
      }
    }
  });
  
  if (stack.length > 0) {
    console.log(`[${filename}] Unclosed tags at end (${stack.length}):`);
    stack.forEach(s => console.log(`  <${s.tag}> opened at line ${s.lineNo}: "${s.line}"`));
  } else {
    console.log(`[${filename}] All tags matched perfectly!`);
  }
}

traceTags('index.html');
traceTags('about-us.html');
traceTags('our-team.html');
