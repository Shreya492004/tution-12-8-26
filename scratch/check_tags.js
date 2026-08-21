const fs = require('fs');

['index.html', 'about-us.html', 'our-team.html', 'plans-and-pricing.html', 'instructor-profile.html'].forEach(filename => {
  const content = fs.readFileSync(filename, 'utf8');
  
  // Count opening and closing tags for common containers
  const divOpen = (content.match(/<div\b/gi) || []).length;
  const divClose = (content.match(/<\/div>/gi) || []).length;
  const sectionOpen = (content.match(/<section\b/gi) || []).length;
  const sectionClose = (content.match(/<\/section>/gi) || []).length;
  const mainOpen = (content.match(/<main\b/gi) || []).length;
  const mainClose = (content.match(/<\/main>/gi) || []).length;
  
  console.log(`${filename}:`);
  console.log(`  div: open=${divOpen}, close=${divClose}, diff=${divOpen - divClose}`);
  console.log(`  section: open=${sectionOpen}, close=${sectionClose}, diff=${sectionOpen - sectionClose}`);
  console.log(`  main: open=${mainOpen}, close=${mainClose}, diff=${mainOpen - mainClose}`);
});
