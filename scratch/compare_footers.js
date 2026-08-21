const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerIdx = content.indexOf('<footer');
  if (footerIdx !== -1) {
    const afterFooter = content.substring(footerIdx);
    const endFooterIdx = afterFooter.indexOf('</footer>');
    const footerContent = afterFooter.substring(0, endFooterIdx + 9);
    const remainder = afterFooter.substring(endFooterIdx + 9);
    
    // Check if there are elements before </body>
    const bodyEndIdx = remainder.indexOf('</body>');
    const betweenFooterAndBody = remainder.substring(0, bodyEndIdx);
    
    console.log(`\n================= ${f} =================`);
    console.log('BETWEEN FOOTER AND </body>:');
    console.log(betweenFooterAndBody.trim());
  }
});
