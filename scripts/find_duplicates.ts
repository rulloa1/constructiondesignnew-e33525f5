
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dirsToScan = [
  'src',
  'public',
  'scanned_pages'
].map(d => path.join(process.cwd(), d));

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

function getHash(filePath) {
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  hash.update(buffer);
  return hash.digest('hex');
}

function scanDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const allFiles = [];
for (const dir of dirsToScan) {
  const files = scanDir(dir);
  allFiles.push(...files);
}

const hashMap = new Map();
const duplicates = [];

console.log(`Scanning ${allFiles.length} files...`);

for (const file of allFiles) {
  try {
    const hash = getHash(file);
    if (hashMap.has(hash)) {
      duplicates.push({
        hash,
        original: hashMap.get(hash),
        duplicate: file
      });
      // specific logic: if 'duplicate' is in 'src/assets' and 'original' is in 'public', or vice versa, we track them.
      // We will group by hash later.
    } else {
      hashMap.set(hash, file);
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

// Group by hash to see sets of identical files
const sets = new Map();
// Populate initial files
for (const [hash, file] of hashMap.entries()) {
  sets.set(hash, [file]);
}
// Add duplicates
for (const dup of duplicates) {
  if (sets.has(dup.hash)) {
    sets.get(dup.hash).push(dup.duplicate);
  }
}

// Filter for sets with > 1 file
const duplicateSets = [];
for (const [hash, files] of sets.entries()) {
  if (files.length > 1) {
    duplicateSets.push(files);
  }
}

console.log(JSON.stringify(duplicateSets, null, 2));
