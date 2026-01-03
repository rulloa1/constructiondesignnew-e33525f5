
import fs from 'fs';
import path from 'path';

// Parse file content regex-style to be safe and dependency-free.
const projectsFile = path.resolve('src/data/projects.ts');
const content = fs.readFileSync(projectsFile, 'utf-8');
const assetsDir = path.resolve('src/assets/projects');

// Extract all image imports
const importMap = new Map();
const importRegex = /import\s+(\w+)\s+from\s+["']@\/assets\/projects\/(.*?)["']/g;
let match;
while ((match = importRegex.exec(content)) !== null) {
    importMap.set(match[1], match[2]);
}

// Check if image files exist
let missingFiles = 0;
importMap.forEach((fileName, varName) => {
    const filePath = path.join(assetsDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.error(`Missing file for ${varName}: ${fileName}`);
        missingFiles++;
    }
});

if (missingFiles === 0) {
    console.log("All imported image files exist on disk.");
} else {
    console.error(`Found ${missingFiles} missing image files.`);
}

console.log("Verifying logical project image assignments...");
// This is a rough check since we are parsing TS text. 
// We want to see if 'images: [' has content.
const projectBlockRegex = /images:\s*\[(.*?)\]/gs;
let projectCount = 0;
let projectsWithImages = 0;

while ((match = projectBlockRegex.exec(content)) !== null) {
    projectCount++;
    const imagesContent = match[1].trim();
    if (imagesContent.length > 0) {
        projectsWithImages++;
    } else {
        console.warn(`Found a project potentially without images around index ${match.index}`);
    }
}

console.log(`Found ${projectCount} project definitions.`);
console.log(`${projectsWithImages} projects appear to have populated image arrays.`);
