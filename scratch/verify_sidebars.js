const fs = require('fs');

const studentFiles = [
  'student-profile.html',
  'student-course.html',
  'studentclasslink.html',
  'student-profile-attendance.html',
  'student-homework-task.html',
  'student-edit.html'
];

studentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const sidebarIndex = content.indexOf('rbt-default-sidebar');
  if (sidebarIndex === -1) {
    console.log(file, 'ERROR: rbt-default-sidebar NOT FOUND');
    return;
  }
  
  const sidebarSection = content.substring(sidebarIndex, sidebarIndex + 6000);
  const regex = /<li([^>]*)>\s*<a([^>]*)href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/li>/g;
  let match;
  const links = [];
  while ((match = regex.exec(sidebarSection)) !== null) {
    const liClass = match[1];
    const aClass = match[2];
    const href = match[3];
    const rawText = match[4].replace(/<[^>]+>/g, '').trim();
    const isActive = liClass.includes('active') || aClass.includes('active');
    links.push({ href, text: rawText, active: isActive });
  }
  console.log('=== ' + file + ' ===');
  console.log(JSON.stringify(links, null, 2));
});
