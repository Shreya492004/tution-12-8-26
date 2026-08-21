const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');
const custom = fs.readFileSync('assets/css/custom-ui.css', 'utf8');

function grepCss(cssText, patterns) {
  const lines = cssText.split('\n');
  lines.forEach((l, idx) => {
    for (let p of patterns) {
      if (l.includes(p)) {
        console.log(`Line ${idx+1}: ${l.trim().substring(0, 120)}`);
        break;
      }
    }
  });
}

console.log('=== STYLE.CSS (Footer/Copyright/Body) ===');
grepCss(css, ['.rbt-footer', '.copyright-area', '.footer-top', 'footer-style-1']);

console.log('=== CUSTOM-UI.CSS (Footer/Copyright/Body) ===');
grepCss(custom, ['.rbt-footer', '.copyright-area', '.footer-top', 'footer-style-1', 'body {', 'body,']);
