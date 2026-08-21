const fs = require('fs');

const targetFiles = [
  'instructor-profile.html',
  'students-list.html',
  'class-schedule.html',
  'classlink.html',
  'tutor-attendance.html',
  'tutor-homework.html',
  'tuitor-edit.html',
  'student-profile.html',
  'student-course.html',
  'studentclasslink.html',
  'student-profile-attendance.html',
  'student-homework-task.html',
  'student-edit.html'
];

targetFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n=== ${file} ===`);
  lines.forEach((line, idx) => {
    if (/font-family|font-size|font-weight|color:/i.test(line) && idx < 650 && line.includes('font-family')) {
      console.log(`  L${idx+1}: ${line.trim()}`);
    }
  });
});
