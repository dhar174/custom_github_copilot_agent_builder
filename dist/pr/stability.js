"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortFileList = sortFileList;
exports.normalizeLineEndings = normalizeLineEndings;
exports.stripTimestamps = stripTimestamps;
function sortFileList(files) {
    return [...files].sort((a, b) => a.path.localeCompare(b.path));
}
// Normalizes line endings to LF
function normalizeLineEndings(content) {
    return content.replace(/\r\n/g, '\n');
}
// remove volatile fields like timestamps
function stripTimestamps(content) {
    // Regex to strip "Run ID: 12345"
    return content.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
}
