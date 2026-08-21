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
  if (!fs.existsSync(page)) {
    console.log(`Page not found: ${page}`);
    return;
  }
  const content = fs.readFileSync(page, 'utf8');
  console.log(`=== ${page} ===`);
  
  // Find sidebar html
  const sidebarMatch = content.match(/<div class="col-lg-3">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i) ||
                       content.match(/<div class="col-lg-3">([\s\S]*?)<!--\s*(Right|MAIN|Main)/i) ||
                       content.match(/<div class="rbt-default-sidebar[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i);
  
  if (sidebarMatch) {
    console.log(`Sidebar snippet (first 300 chars):`, sidebarMatch[0].substring(0, 300));
  } else {
    console.log(`Sidebar container not found via regex`);
  }
  
  // Check inline style rules for sidebar
  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  styleMatch.forEach((st, idx) => {
    if (/sidebar|dashboard-mainmenu|rbt-default-sidebar/i.test(st)) {
      console.log(`Style #${idx+1} has sidebar rules!`);
    }
  });
});
