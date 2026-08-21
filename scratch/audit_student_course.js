const fs = require('fs');

const content = fs.readFileSync('student-course.html', 'utf8');
const lines = content.split('\n');
let stack = [];

lines.forEach((line, idx) => {
  const lineNo = idx + 1;
  const tagRegex = /<(\/)?([a-zA-Z0-9\-]+)([^>]*)>/g;
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const isClosing = !!match[1];
    const tagName = match[2].toLowerCase();
    const rawTag = match[0];
    
    // Ignore void / self-closing tags
    if (['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'path', 'g', 'circle', 'svg', 'polygon', 'defs', 'rect'].includes(tagName)) {
      continue;
    }
    if (rawTag.endsWith('/>')) continue;
    
    if (!isClosing) {
      stack.push({ tag: tagName, lineNo, lineText: line.trim() });
    } else {
      if (stack.length === 0) {
        console.log(`[Line ${lineNo}] Closing tag </${tagName}> found with empty stack!`);
      } else {
        const last = stack[stack.length - 1];
        if (last.tag === tagName) {
          stack.pop();
        } else {
          // Search backwards
          let foundIdx = -1;
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].tag === tagName) {
              foundIdx = i;
              break;
            }
          }
          if (foundIdx !== -1) {
            const popped = stack.splice(foundIdx);
            // console.log(`[Line ${lineNo}] Closing </${tagName}> closed ${popped.length} tags from line ${last.lineNo}: <${last.tag}>`);
          } else {
            console.log(`[Line ${lineNo}] Unexpected closing tag </${tagName}>`);
          }
        }
      }
    }
  }
});

console.log('Final unclosed tags stack:', stack);
