const fs = require('fs');

const home = fs.readFileSync('index.html', 'utf8');
const about = fs.readFileSync('about-us.html', 'utf8');
const team = fs.readFileSync('our-team.html', 'utf8');
const plans = fs.readFileSync('plans-and-pricing.html', 'utf8');
const instructor = fs.readFileSync('instructor-profile.html', 'utf8');

function inspectEnd(name, html) {
  console.log(`\n=================== ${name} ===================`);
  const lines = html.split('\n');
  const footerLineIdx = lines.findIndex(l => l.includes('<footer'));
  console.log(`Footer starts at line ${footerLineIdx + 1}`);
  
  // Show lines from footer to end of file
  lines.slice(footerLineIdx).forEach((l, i) => {
    if (l.trim().length > 0 && !l.includes('src="assets/js') && !l.includes('script') && !l.includes('//') && !l.includes('/*') && !l.includes('document.addEventListener')) {
      console.log(`L${footerLineIdx + 1 + i}: ${l}`);
    }
  });
}

inspectEnd('index.html', home);
inspectEnd('about-us.html', about);
inspectEnd('our-team.html', team);
inspectEnd('plans-and-pricing.html', plans);
inspectEnd('instructor-profile.html', instructor);
