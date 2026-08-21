const fs = require('fs');

function traceRange(filename, maxLine) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n').slice(0, maxLine);
  let stack = [];
  
  lines.forEach((line, lineNo) => {
    const regex = /<(\/)?([a-zA-Z0-9\-]+)([^>]*)>/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const isClosing = !!m[1];
      const tag = m[2].toLowerCase();
      const raw = m[0];
      
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
          console.log(`L${lineNo + 1}: Extra closing </${tag}>: "${line.trim()}"`);
        } else {
          const last = stack.pop();
          if (last.tag !== tag) {
            console.log(`L${lineNo + 1}: Mismatch: popped <${last.tag}> (from L${last.lineNo}), got </${tag}>: "${line.trim()}"`);
          }
        }
      }
    }
  });
  console.log(`Unclosed at line ${maxLine}:`, stack);
}

traceRange('index.html', 260);
