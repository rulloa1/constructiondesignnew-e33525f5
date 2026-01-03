
import fs from 'fs';
import path from 'path';

// This input will be pasted from the PowerShell output (or read from a file if I saved it, but I'll just hardcode the data or read a file I write).
// Actually, I'll read the file list using readdir again or just use the logic directly.

// Wait, I can't easily paste the huge JSON I got. 
// I will re-implement the scan in this script but focusing on size equality which is fast.

const dirs = ['src/assets', 'public', 'scanned_pages'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allFiles = [];
dirs.forEach(d => {
    if (fs.existsSync(d)) {
        getAllFiles(d, allFiles);
    }
});

const sizeMap = {};

allFiles.forEach(f => {
    try {
        const stat = fs.statSync(f);
        if (!sizeMap[stat.size]) {
            sizeMap[stat.size] = [];
        }
        sizeMap[stat.size].push(f);
    } catch (e) { }
});

let deletedCount = 0;

Object.keys(sizeMap).forEach(size => {
    const files = sizeMap[size];
    if (files.length > 1) {
        // Potential duplicates
        // Group by extension
        const extMap = {};
        files.forEach(f => {
            const ext = path.extname(f).toLowerCase();
            if (!extMap[ext]) extMap[ext] = [];
            extMap[ext].push(f);
        });

        Object.keys(extMap).forEach(ext => {
            const sameExtFiles = extMap[ext];
            if (sameExtFiles.length > 1) {
                // Determine which to keep
                // Logic:
                // 1. Prefer 'src' over 'public' (or vice versa? 'src' is source).
                // 2. Prefer shorter names? No, usually longer is more descriptive?
                // 3. Prefer names without numbers like (1) or "Copy".
                // 4. Prefer names matching the "project" naming (e.g. 'north-florida' vs 'nfl').

                // Heuristic: valid variable name chars are better.

                // specific fix for nfl vs north-florida
                sameExtFiles.sort((a, b) => {
                    const baseA = path.basename(a);
                    const baseB = path.basename(b);

                    // Penalize "copy", "(1)"
                    if (baseA.match(/copy/i) && !baseB.match(/copy/i)) return 1;
                    if (baseB.match(/copy/i) && !baseA.match(/copy/i)) return -1;

                    if (baseA.match(/\(\d+\)/) && !baseB.match(/\(\d+\)/)) return 1;
                    if (baseB.match(/\(\d+\)/) && !baseA.match(/\(\d+\)/)) return -1;

                    // Penalize short cryptic names like "nfl-001" vs "north-florida"
                    // "nfl" is 3 chars, "north-florida" is 13.
                    // But "img_1" vs "sunset"

                    // Prefer names with hyphens (kebab-case) over unrelated codes

                    return baseA.length - baseB.length; // Keep the SHORTER one? 
                    // Wait, 'nfl-001.jpg' (11) vs 'north-florida-1.jpg' (19).
                    // Usually descriptive is longer.
                    // But 'Photo.jpg' vs 'Photo (1).jpg'. 'Photo.jpg' is shorter and better.
                    // 'nfl-001' vs 'north-florida-1'.

                    // I will prefer the one that is used in the codebase? 
                    // I can't easily check usage here efficiently.

                    // Let's print them and decide or just dry-run.
                    // For now, I'll log them.
                });

                // We keep the first one after sort (best one).
                // Wait, if I sort by length ascending, I keep the shortest.
                // 'north-florida-1' (longer) might be better than 'nfl-001' (shorter)?
                // Actually the user probably wants the one that matches the webp name.
                // 'north-florida-1.webp' exists.

                console.log(`Duplicate Group (${size} bytes):`);
                sameExtFiles.forEach(f => console.log(` - ${f}`));

                // Identify files to delete (all except the "best" one)
                // Current logic: Just logging.
            }
        });
    }
});
