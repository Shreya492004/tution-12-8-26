const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const bodyClassMatch = content.match(/<body([^>]*)>/i);
    const bodyClass = bodyClassMatch ? bodyClassMatch[1] : 'NONE';
    
    const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    let headerOverrides = [];
    let footerOverrides = [];
    
    styleMatches.forEach(styleTag => {
        const inner = styleTag.replace(/<\/?style[^>]*>/gi, '');
        if (/header|\.mainmenu|\.logo|\.login-dropdown/i.test(inner)) {
            // Find matched selectors
            const lines = inner.split('\n').filter(l => /header|\.mainmenu|\.logo|\.login-dropdown/i.test(l));
            headerOverrides.push(...lines.map(l => l.trim()));
        }
        if (/footer|\.copyright/i.test(inner)) {
            const lines = inner.split('\n').filter(l => /footer|\.copyright/i.test(l));
            footerOverrides.push(...lines.map(l => l.trim()));
        }
    });

    console.log(`\n=== ${f} === (body attr: ${bodyClass})`);
    if (headerOverrides.length > 0) {
        console.log(`  Header CSS overrides (${headerOverrides.length}):`, headerOverrides.slice(0, 5));
    }
    if (footerOverrides.length > 0) {
        console.log(`  Footer CSS overrides (${footerOverrides.length}):`, footerOverrides.slice(0, 5));
    }
});
