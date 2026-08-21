const fs = require('fs');

function findMismatch(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  let depth = 0;
  let stack = [];
  
  lines.forEach((line, lineNo) => {
    // find all <div or </div>
    const tagMatches = line.matchAll(/<\/?div\b[^>]*>/gi);
    for (let m of tagMatches) {
      const tag = m[0];
      if (tag.startsWith('</')) {
        depth--;
        if (depth < 0) {
          console.log(`${filename}: Extra </div> found at line ${lineNo + 1}: ${line.trim()}`);
          depth = 0; // reset
        }
      } else if (!tag.endsWith('/>')) {
        depth++;
      }
    }
  });
  console.log(`${filename}: Final depth = ${depth}`);
}

findMismatch('index.html');
findMismatch('about-us.html');
findMismatch('our-team.html');
findMismatch('plans-and-pricing.html');
