const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Ensure body class="rbt-header-sticky"
    content = content.replace(/<body[^>]*>/i, '<body class="rbt-header-sticky">');

    // 2. Remove conflicting inline header navigation styles from <style> tags
    // Patterns like .rbt-header .rbt-main-navigation .mainmenu > li > a { ... }
    content = content.replace(/\/\*\s*Header Navigation[^*]*\*\/\s*@media[^{]*\{[\s\S]*?\.rbt-header[\s\S]*?\}\s*\}\s*\}/gi, '');
    content = content.replace(/\/\*\s*Header Navigation[^*]*\*\/\s*\.rbt-header[\s\S]*?\.rbt-header[^{]*\{[\s\S]*?\}\s*\}/gi, '');
    
    // Remove specific standalone .rbt-header overrides in <style>
    content = content.replace(/\.rbt-header\s*\.mainbar-row\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu-nav\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu\s*>\s*li\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu\s*>\s*li\s*>\s*a(?:\s*,\s*\.rbt-header\s*\.rbt-main-navigation\s*a)?\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu\s*>\s*li\s*>\s*a:hover(?:\s*,\s*\.rbt-header\s*\.rbt-main-navigation\s*a:hover)?\s*\{[\s\S]*?\}\s*/gi, '');
    content = content.replace(/\.rbt-header\s*\.rbt-main-navigation\s*\.mainmenu\s*>\s*li\s*>\s*a\.active\s*\{[\s\S]*?\}\s*/gi, '');
    
    // Clean up empty @media only screen and (min-width: 1200px) { } or similar
    content = content.replace(/@media\s+only\s+screen\s+and\s+\(min-width:\s*1200px\)\s*\{\s*\}/gi, '');
    content = content.replace(/@media\s*\([^\)]*\)\s*\{\s*\}/gi, '');

    // Clean up multiple blank lines
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned ${file}`);
});

console.log("All HTML inline header styles cleaned!");
