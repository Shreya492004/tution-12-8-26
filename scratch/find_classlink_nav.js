const fs = require('fs');

const content = fs.readFileSync('classlink.html', 'utf8');
const lines = content.split('\n');

lines.slice(0, 630).forEach((l, i) => {
  if (/nav|menu|header|sidebar|rbt-header|rbt-main|login-dropdown/i.test(l)) {
    console.log(`L${i+1}: ${l}`);
  }
});
