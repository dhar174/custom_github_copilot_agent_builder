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
exports.loadPackSource = loadPackSource;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const COMPONENT_PATHS = {
    instructions: ['.github/copilot-instructions.md', '.github/instructions'],
    agents: ['.github/agents'],
    prompts: ['.github/prompts'],
    skills: ['.copilot/skills', 'docs/specs/skills'],
    'repo-profile': ['repo-profile.md'],
    mcp: ['mcp.md'],
    'decision-log': ['decision-log.md'],
    specs: ['docs/specs'],
    context: ['docs/context'],
    memory: ['docs/memory'],
};
function collectFiles(root, relativePath) {
    const absolute = path.join(root, relativePath);
    if (!fs.existsSync(absolute))
        return [];
    const stat = fs.statSync(absolute);
    if (stat.isFile()) {
        return [relativePath.replace(/\\/g, '/')];
    }
    const entries = fs.readdirSync(absolute, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const entryPath = path.join(relativePath, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectFiles(root, entryPath));
        }
        else if (entry.isFile()) {
            files.push(entryPath.replace(/\\/g, '/'));
        }
    }
    return files;
}
function loadPackSource(sourceRoot, components) {
    const warnings = [];
    const files = [];
    for (const component of components) {
        const paths = COMPONENT_PATHS[component];
        if (!paths) {
            warnings.push(`Unknown component mapping for ${component}`);
            continue;
        }
        let matched = false;
        for (const relative of paths) {
            const collected = collectFiles(sourceRoot, relative);
            if (collected.length === 0)
                continue;
            matched = true;
            for (const filePath of collected) {
                const absolute = path.join(sourceRoot, filePath);
                const content = fs.readFileSync(absolute, 'utf8');
                files.push({ path: filePath, content });
            }
        }
        if (!matched) {
            warnings.push(`No source files found for component ${component}`);
        }
    }
    return { files, warnings };
}
