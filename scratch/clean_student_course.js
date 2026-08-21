const fs = require('fs');
let content = fs.readFileSync('student-course.html', 'utf8');
const lines = content.split('\n');
const realDocStart = lines.findIndex((l, idx) => idx > 5 && l.includes('<html lang="en">'));
if (realDocStart !== -1) {
  const newContent = '<!DOCTYPE html>\n' + lines.slice(realDocStart).join('\n');
  fs.writeFileSync('student-course.html', newContent, 'utf8');
  console.log('Successfully trimmed duplicate top in student-course.html!');
} else {
  console.log('Could not find second <html lang="en">');
}
