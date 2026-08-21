const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const styleMatches = c.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    styleMatches.forEach((styleTag, idx) => {
        const inner = styleTag.replace(/<\/?style[^>]*>/gi, '');
        const lines = inner.split('\n');
        lines.forEach((line, lineNo) => {
            if (/\.rbt-header|\.mainmenu|\.header-sticky|\.login-dropdown|\.hamberger|\.rbt-footer|\.copyright-area/i.test(line)) {
                console.log(`${f} (style #${idx}, line ${lineNo}): ${line.trim()}`);
            }
        });
    });
});
