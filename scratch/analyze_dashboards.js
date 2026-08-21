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

const studentPages = [
  'student-profile.html',
  'student-course.html',
  'studentclasslink.html',
  'student-profile-attendance.html',
  'student-homework-task.html',
  'student-edit.html'
];

const allTargetPages = [...tutorPages, ...studentPages];

allTargetPages.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const styles = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  console.log(`\n=================== ${f} (${styles.length} style tags) ===================`);
  styles.forEach((st, idx) => {
    const text = st.replace(/<\/?style[^>]*>/gi, '');
    const fontMatches = text.match(/font-family:[^;]+;/gi) || [];
    const colorMatches = text.match(/color:[^;]+;/gi) || [];
    const sizeMatches = text.match(/font-size:[^;]+;/gi) || [];
    console.log(`  Style #${idx+1} (${text.length} chars):`);
    console.log(`    Unique font-families:`, [...new Set(fontMatches)].slice(0, 5));
    console.log(`    Sample font-sizes:`, [...new Set(sizeMatches)].slice(0, 8));
  });
});
