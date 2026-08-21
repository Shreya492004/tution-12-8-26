const fs = require('fs');
let content = fs.readFileSync('tutor-homework.html', 'utf8');
const secondDocType = content.indexOf('<!DOCTYPE html>', 10);
if (secondDocType !== -1) {
  content = content.substring(secondDocType);
  fs.writeFileSync('tutor-homework.html', content, 'utf8');
  console.log('Successfully trimmed duplicate top in tutor-homework.html!');
} else {
  console.log('No second DOCTYPE found');
}
