const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Update h1 tags
      content = content.replace(/<h1([^>]*)className=\"([^\"]*)\"([^>]*)>/g, (match, p1, className, p3) => {
        let newClassName = className;
        if (!newClassName.includes('font-serif')) {
          newClassName += ' font-serif';
        }
        newClassName = newClassName.replace(/font-extrabold/g, 'font-semibold');
        newClassName = newClassName.replace(/font-bold/g, 'font-semibold');
        // Clean up spaces
        newClassName = newClassName.replace(/\s+/g, ' ').trim();
        return `<h1${p1}className="${newClassName}"${p3}>`;
      });
      
      // Update h2 tags
      content = content.replace(/<h2([^>]*)className=\"([^\"]*)\"([^>]*)>/g, (match, p1, className, p3) => {
        let newClassName = className;
        newClassName = newClassName.replace(/font-extrabold/g, 'font-semibold');
        newClassName = newClassName.replace(/font-bold/g, 'font-semibold');
        return `<h2${p1}className="${newClassName}"${p3}>`;
      });

      // Update h3 tags
      content = content.replace(/<h3([^>]*)className=\"([^\"]*)\"([^>]*)>/g, (match, p1, className, p3) => {
        let newClassName = className;
        newClassName = newClassName.replace(/font-extrabold/g, 'font-semibold');
        newClassName = newClassName.replace(/font-bold/g, 'font-semibold');
        return `<h3${p1}className="${newClassName}"${p3}>`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'src/pages'));
processDir(path.join(process.cwd(), 'src/features'));
processDir(path.join(process.cwd(), 'src/components'));
