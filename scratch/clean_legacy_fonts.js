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

  // Replace font families
  content = content.replace(/"Euclid Circular A",\s*"Euclid Circular",\s*sans-serif/gi, 'var(--font-primary)');
  content = content.replace(/"Euclid Circular",\s*"Euclid Circular A",\s*sans-serif/gi, 'var(--font-primary)');
  content = content.replace(/"Euclid Circular",\s*sans-serif/gi, 'var(--font-primary)');
  content = content.replace(/"Euclid Circular A",\s*sans-serif/gi, 'var(--font-primary)');
  content = content.replace(/"Euclid Circular"/gi, 'var(--font-primary)');
  content = content.replace(/"Euclid Circular A"/gi, 'var(--font-primary)');
  content = content.replace(/var\(--font-primary,\s*"Euclid Circular A",\s*"Plus Jakarta Sans",\s*"Inter",\s*sans-serif\)/gi, 'var(--font-primary)');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated fonts in ${f}`);
  } else {
    console.log(`No changes needed in ${f}`);
  }
});
