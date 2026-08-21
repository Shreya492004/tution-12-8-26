const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check for broken icon class names or invalid patterns
  const brokenFeather = content.match(/class="[^"]*feather-[^"a-zA-Z0-9_-]/g);
  if (brokenFeather) {
    console.log(file, 'Potential broken feather class:', brokenFeather);
  }
  
  // Check for broken fontawesome classes
  const brokenFa = content.match(/class="[^"]*fa-[^"a-zA-Z0-9_-]/g);
  if (brokenFa) {
    console.log(file, 'Potential broken fa class:', brokenFa);
  }
});
console.log('Icon class scan complete.');
