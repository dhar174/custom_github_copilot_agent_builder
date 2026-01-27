"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortFileList = sortFileList;
exports.deterministicSort = deterministicSort;
exports.sortMapKeys = sortMapKeys;
exports.stabilizeContent = stabilizeContent;
exports.normalizeLineEndings = normalizeLineEndings;
exports.stripTimestamps = stripTimestamps;
function sortFileList(files) {
    return [...files].sort((a, b) => a.path.localeCompare(b.path));
}
function deterministicSort(items, keySelector) {
    return [...items].sort((a, b) => keySelector(a).localeCompare(keySelector(b)));
}
function sortMapKeys(map) {
    const sorted = {};
    Object.keys(map)
        .sort()
        .forEach((key) => {
        sorted[key] = map[key];
    });
    return sorted;
}
// Normalizes content for stable diffs
function stabilizeContent(content) {
    // Normalize line endings to LF
    let stable = content.replace(/\r\n/g, '\n');
    // Strip volatile fields like timestamps
    // Example: "Run ID: 12345" or "<!-- Generated at: ... -->"
    stable = stable.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
    stable = stable.replace(/<!-- Generated at: .* -->/g, '<!-- Generated at: [TIMESTAMP] -->');
    return stable;
}
// Backward compatibility (deprecated)
function normalizeLineEndings(content) {
    return content.replace(/\r\n/g, '\n');
}
function stripTimestamps(content) {
    return content.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
}
