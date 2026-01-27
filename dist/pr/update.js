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
exports.upsertPr = upsertPr;
const github = __importStar(require("@actions/github"));
const exec = __importStar(require("@actions/exec"));
async function upsertPr(context, options) {
    const octokit = github.getOctokit(context.token);
    // 1. Configure and Push Git Branch
    await setupGitUser();
    const branchUpdated = await pushBranch(options.branch, options.commitMessage, context);
    // 2. Find existing PR
    const { data: pullRequests } = await octokit.rest.pulls.list({
        owner: context.owner,
        repo: context.repo,
        head: `${context.owner}:${options.branch}`,
        state: 'open',
    });
    const existingPr = pullRequests[0];
    const base = options.base || 'main';
    if (existingPr) {
        let updated = false;
        // Update body if changed
        if (existingPr.body?.trim() !== options.body.trim()) {
            await octokit.rest.pulls.update({
                owner: context.owner,
                repo: context.repo,
                pull_number: existingPr.number,
                body: options.body,
                title: options.title
            });
            updated = true;
        }
        if (branchUpdated) {
            updated = true;
        }
        return { prNumber: existingPr.number, url: existingPr.html_url, created: false, updated };
    }
    else {
        // If we didn't update the branch (no changes) and no PR exists, then we have nothing to create PR for
        if (!branchUpdated) {
            console.log('No changes and no existing PR, skipping PR creation');
            return { prNumber: 0, url: '', created: false, updated: false };
        }
        try {
            const { data: newPr } = await octokit.rest.pulls.create({
                owner: context.owner,
                repo: context.repo,
                head: options.branch,
                base: base,
                title: options.title,
                body: options.body,
            });
            return { prNumber: newPr.number, url: newPr.html_url, created: true, updated: false };
        }
        catch (e) {
            console.warn(`PR creation failed: ${e.message}`);
            return { prNumber: 0, url: '', created: false, updated: false };
        }
    }
}
async function setupGitUser() {
    await exec.exec('git', ['config', 'user.name', 'github-actions[bot]']);
    await exec.exec('git', ['config', 'user.email', 'github-actions[bot]@users.noreply.github.com']);
}
// Returns true if branch was updated/pushed
async function pushBranch(branch, message, context) {
    const remoteUrl = `https://x-access-token:${context.token}@github.com/${context.owner}/${context.repo}.git`;
    // We ignore error here in case standard setup already did it, but setting it ensures we use our token.
    // However, set-url might fail if origin doesn't exist? Standard actions setup usually has origin.
    try {
        await exec.exec('git', ['remote', 'set-url', 'origin', remoteUrl]);
    }
    catch (e) {
        console.warn('Failed to set remote URL, attempting to continue', e);
    }
    await exec.exec('git', ['checkout', '-B', branch]);
    await exec.exec('git', ['add', '.']);
    const statusOutput = await exec.getExecOutput('git', ['status', '--porcelain']);
    if (statusOutput.stdout.trim().length > 0) {
        await exec.exec('git', ['commit', '-m', message]);
        await exec.exec('git', ['push', '-f', 'origin', branch]);
        return true;
    }
    else {
        console.log('No file changes to commit');
        return false;
    }
}
