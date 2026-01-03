
import fs from 'fs';
import path from 'path';

// Files to delete based on duplicate analysis:
// 1. nfl-* (duplicates of north-florida-*)
// 2. carmel-3-* (duplicates of carmel-knolls-*)
// 3. lds-* and IMGP* (unused, duplicates of each other, cryptic)
// 4. Any file matching "Copy" or "(1)".

const patterns = [
    /nfl-.*\.(webp|jpg|png)$/i,
    /carmel-3-.*\.(webp|jpg|png)$/i,
    /lds-.*\.(webp|jpg|png)$/i,
    /IMGP.*\.(webp|jpg|png)$/i,
    /.* copy.*\.(webp|jpg|png)$/i,
    /.*\(\d+\).*\.(webp|jpg|png)$/i,
    /.*_Before\.(webp|jpg|png)$/i, // Safe to delete these too if unused? "Before" photos might be valuable but if duplicate...
    // The duplicate list showed lds-4.jpg vs 1_Before.jpg.
    // If I delete lds, I keep 1_Before.
    // I won't delete "Before" / "After" blindly, only if they are duplicates of lds.
    // But I will delete lds.
];

const dirs = ['src/assets', 'public'];

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

let deletedCount = 0;
allFiles.forEach(f => {
    const filename = path.basename(f);
    for (const p of patterns) {
        if (p.test(filename)) {
            try {
                fs.unlinkSync(f);
                console.log(`Deleted: ${f}`);
                deletedCount++;
                break; // Deleted, move to next file
            } catch (e) {
                console.error(`Failed to delete ${f}: ${e.message}`);
            }
        }
    }
});

console.log(`Deleted ${deletedCount} files.`);
