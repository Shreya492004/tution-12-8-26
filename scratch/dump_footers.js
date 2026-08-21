const fs = require('fs');

['index.html', 'about-us.html', 'our-team.html', 'book-online.html', 'instructor-profile.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/i);
  if (footerMatch) {
    console.log(`\n================= ${f} FOOTER HTML =================`);
    console.log(footerMatch[0]);
  }
});
