const fs = require('fs');

['index.html', 'about-us.html', 'our-team.html', 'instructor-profile.html', 'student-profile.html', 'book-online.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n================= ${f} =================`);
  
  // Find all <style> tags
  const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  styleMatches.forEach((s, idx) => {
    console.log(`STYLE TAG #${idx+1} (${s.length} chars)`);
    // print any rules affecting footer, body, html, rbt-section-gap, copyright, wrapper, etc.
    const lines = s.split('\n');
    lines.forEach(l => {
      if (/footer|copyright|padding-bottom|margin-bottom|bottom|body|html|floating-contact|rbt-progress-parent/i.test(l)) {
        console.log(`   ${l.trim()}`);
      }
    });
  });
});
