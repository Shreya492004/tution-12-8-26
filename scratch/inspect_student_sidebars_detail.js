const fs = require('fs');

const studentPages = [
  'student-profile.html',
  'student-course.html',
  'studentclasslink.html',
  'student-profile-attendance.html',
  'student-homework-task.html',
  'student-edit.html'
];

studentPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  console.log(`\n========================================\nFILE: ${page}\n========================================`);
  
  // Find sidebar HTML:
  const idx = content.indexOf('rbt-default-sidebar');
  if (idx !== -1) {
    const start = content.lastIndexOf('<div class="col-lg-3">', idx);
    const end = content.indexOf('<!--', idx + 50);
    console.log("--- SIDEBAR HTML ---");
    console.log(content.substring(start !== -1 ? start : idx, end !== -1 ? end : idx + 1000));
  }
  
  // Find sidebar CSS:
  const styles = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  styles.forEach(st => {
    const lines = st.split('\n').filter(l => /sidebar|dashboard-mainmenu|rbt-default-sidebar/i.test(l));
    if (lines.length) {
      console.log("--- SIDEBAR CSS MATCHES ---");
      console.log(lines.join('\n'));
    }
  });
});
