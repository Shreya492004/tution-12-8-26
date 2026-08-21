const fs = require('fs');
let content = fs.readFileSync('student-course.html', 'utf8');
const secondHtmlIndex = content.indexOf('<html lang="en">', 10);
if (secondHtmlIndex !== -1) {
  content = '<!DOCTYPE html>\n' + content.substring(secondHtmlIndex);
  fs.writeFileSync('student-course.html', content, 'utf8');
  console.log('Fixed student-course.html cleanly!');
} else {
  console.log('No second html tag found');
}
