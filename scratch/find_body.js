const fs = require('fs');
const content = fs.readFileSync('assets/css/custom-ui.css', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('body') || l.includes('html')) {
    console.log(`L${i+1}: ${l}`);
  }
});
