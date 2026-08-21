const fs = require('fs');

const css1 = fs.readFileSync('assets/css/style.css', 'utf8');
const css2 = fs.readFileSync('assets/css/custom-ui.css', 'utf8');

function searchRules(css, filename) {
  console.log(`\n=================== ${filename} ===================`);
  const lines = css.split('\n');
  lines.forEach((l, idx) => {
    if (/rbt-header-sticky|header-sticky|rbt-sticky-placeholder|rbt-header-top|padding-top|margin-top|header\.rbt-header|\.rbt-header /i.test(l)) {
      if (/body|header|placeholder|\.rbt-header|top/i.test(l)) {
        console.log(`L${idx+1}: ${l.trim().substring(0, 100)}`);
      }
    }
  });
}

searchRules(css1, 'style.css');
searchRules(css2, 'custom-ui.css');
