"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPackFiles = applyPackFiles;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const managed_sections_1 = require("./managed-sections");
function detectLineEnding(content) {
    if (content && content.includes('\r\n')) {
        return 'crlf';
    }
    return 'lf';
}
function applyPackFiles(basePath, files, options) {
    const ordered = [...files].sort((a, b) => a.path.localeCompare(b.path));
    const changes = [];
    const warnings = [];
    for (const file of ordered) {
        const targetPath = path.join(basePath, file.path);
        const existing = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : null;
        const lineEnding = options.lineEnding ?? detectLineEnding(existing);
        const { content, status, reason } = (0, managed_sections_1.applyManagedSections)(existing, [{ id: file.managedId ?? file.path, content: file.content }], { refreshOnly: options.refreshOnly });
        changes.push({ path: file.path, status, reason });
        if (status === 'updated' || status === 'added') {
            if (options.mode === 'apply') {
                fs.mkdirSync(path.dirname(targetPath), { recursive: true });
                fs.writeFileSync(targetPath, (0, managed_sections_1.formatLineEndings)(content, lineEnding), 'utf8');
            }
        }
    }
    const summary = changes.reduce((acc, change) => {
        acc[change.status] += 1;
        if (change.status === 'skipped' && change.reason) {
            warnings.push(`${change.path}: ${change.reason}`);
        }
        return acc;
    }, { added: 0, updated: 0, unchanged: 0, skipped: 0 });
    return {
        changes,
        summary,
        noChanges: summary.added + summary.updated === 0,
        warnings,
    };
}
