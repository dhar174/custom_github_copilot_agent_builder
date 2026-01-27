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
    const branchUpdated = await pushBranch(options.branch, options.commitMessage, context, options.forcePush ?? true);
    // 2. Find existing PR
    let pullRequests;
    try {
        const resp = await octokit.rest.pulls.list({
            owner: context.owner,
            repo: context.repo,
            head: `${context.owner}:${options.branch}`,
            state: 'open',
        });
        pullRequests = resp.data;
    }
    catch (e) {
        // If 404/auth error, we might not be able to list PRs.
        throw new Error(`Failed to list PRs: ${e.message}`);
    }
    const existingPr = pullRequests && pullRequests.length > 0 ? pullRequests[0] : undefined;
    const base = options.base || 'main';
    if (existingPr) {
        let updated = false;
        // Update body/title if changed
        if ((existingPr.body?.trim() !== options.body.trim()) || (existingPr.title !== options.title)) {
            await octokit.rest.pulls.update({
                owner: context.owner,
                repo: context.repo,
                pull_number: existingPr.number,
                body: options.body,
                title: options.title
            });
            updated = true;
        }
        // If the branch content changed, the PR is implicitly updated
        if (branchUpdated) {
            updated = true;
        }
        return { prNumber: existingPr.number, url: existingPr.html_url, created: false, updated };
    }
    else {
        // If we didn't update the branch (no changes) and no existing PR, then we have nothing to create PR for
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
async function pushBranch(branch, message, context, force) {
    const remoteUrl = `https://x-access-token:${context.token}@github.com/${context.owner}/${context.repo}.git`;
    try {
        // Just in case origin doesn't exist or is different
        await exec.exec('git', ['remote', 'set-url', 'origin', remoteUrl]);
    }
    catch (e) {
        console.warn('Failed to set remote URL, attempting to continue', e);
    }
    // Checkout new orphan branch or reset existing?
    // Using -B resets the branch pointer to HEAD
    await exec.exec('git', ['checkout', '-B', branch]);
    await exec.exec('git', ['add', '.']);
    const statusOutput = await exec.getExecOutput('git', ['status', '--porcelain']);
    if (statusOutput.stdout.trim().length > 0) {
        await exec.exec('git', ['commit', '-m', message]);
        const args = ['push', 'origin', branch];
        if (force) {
            args.push('--force');
        }
        await exec.exec('git', args);
        return true;
    }
    else {
        console.log('No file changes to commit');
        return false;
    }
}
