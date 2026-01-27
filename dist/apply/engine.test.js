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
const vitest_1 = require("vitest");
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const engine_1 = require("./engine");
function createTempDir() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'agentops-apply-'));
}
(0, vitest_1.describe)('applyPackFiles', () => {
    (0, vitest_1.it)('reports added and writes file in apply mode', () => {
        const dir = createTempDir();
        const result = (0, engine_1.applyPackFiles)(dir, [{ path: 'docs/alpha.md', content: 'alpha content', managedId: 'alpha' }], { mode: 'apply' });
        (0, vitest_1.expect)(result.summary.added).toBe(1);
        (0, vitest_1.expect)(fs.existsSync(path.join(dir, 'docs/alpha.md'))).toBe(true);
    });
    (0, vitest_1.it)('does not write file in dry-run mode', () => {
        const dir = createTempDir();
        const result = (0, engine_1.applyPackFiles)(dir, [{ path: 'docs/beta.md', content: 'beta content', managedId: 'beta' }], { mode: 'dry-run' });
        (0, vitest_1.expect)(result.summary.added).toBe(1);
        (0, vitest_1.expect)(fs.existsSync(path.join(dir, 'docs/beta.md'))).toBe(false);
    });
    (0, vitest_1.it)('skips files without managed markers when existing content present', () => {
        const dir = createTempDir();
        const target = path.join(dir, 'docs/gamma.md');
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, 'plain content', 'utf8');
        const result = (0, engine_1.applyPackFiles)(dir, [{ path: 'docs/gamma.md', content: 'new content', managedId: 'gamma' }], { mode: 'dry-run' });
        (0, vitest_1.expect)(result.summary.skipped).toBe(1);
        (0, vitest_1.expect)(result.noChanges).toBe(true);
    });
});
