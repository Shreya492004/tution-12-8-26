const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let updatedFiles = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace inline icon font protection blocks that used display: inline-block
  content = content.replace(
    /(\/\*\s*Icon Font Protection[^*]*\*\/[\s\S]*?i\[class\^="feather-"\][\s\S]*?display:\s*)inline-block(\s*!important;)/gi,
    '$1inline-flex !important; align-items: center !important; justify-content: center !important; vertical-align: middle$2'
  );

  content = content.replace(
    /(i\[class\^="fa-"\][\s\S]*?display:\s*)inline-block(\s*!important;)/gi,
    '$1inline-flex !important; align-items: center !important; justify-content: center !important; vertical-align: middle$2'
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFiles.push(file);
  }
});

console.log('Updated icon display in files:', updatedFiles);
