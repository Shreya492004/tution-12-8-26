const fs = require('fs');

const tutorPages = [
  'instructor-profile.html',
  'students-list.html',
  'class-schedule.html',
  'classlink.html',
  'tutor-attendance.html',
  'tutor-homework.html',
  'tuitor-edit.html'
];

tutorPages.forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  console.log(`\n========================================\nFILE: ${page}\n========================================`);
  const idx = content.indexOf('rbt-default-sidebar');
  if (idx !== -1) {
    const start = content.lastIndexOf('<div class="col-lg-3">', idx);
    const end = content.indexOf('<!--', idx + 50);
    console.log(content.substring(start !== -1 ? start : idx, end !== -1 ? end : idx + 800));
  }
});
