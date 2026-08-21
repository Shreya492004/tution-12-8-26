const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerMatch = content.match(/<footer[^>]*class=["']([^"']*)["'][^>]*>([\s\S]*?)<\/footer>/i);
  if (footerMatch) {
    const footerClass = footerMatch[1];
    const footerInner = footerMatch[2];
    const hasFooterTop = footerInner.includes('footer-top');
    const hasCopyright = footerInner.includes('copyright-area');
    const copyrightMatch = footerInner.match(/<div[^>]*class=["']([^"']*copyright[^"']*)["'][^>]*>/i);
    const copyrightClass = copyrightMatch ? copyrightMatch[1] : 'NONE';
    
    // Check if there are any specific styles or classes
    console.log(`${f.padEnd(35)} footer: ${footerClass} | copyright: ${copyrightClass}`);
  } else {
    console.log(`${f.padEnd(35)} NO FOOTER`);
  }
});
