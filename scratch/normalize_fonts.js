const fs = require('fs');

const files = [
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

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  content = content.replace(/var\(--font-primary\),\s*var\(--font-primary\)/gi, 'var(--font-primary)');
  content = content.replace(/var\(--font-primary,\s*var\(--font-primary\),\s*"Plus Jakarta Sans",\s*"Inter",\s*sans-serif\)/gi, 'var(--font-primary)');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Cleaned font references in ${f}`);
  }
});
