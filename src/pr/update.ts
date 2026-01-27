import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { PrOptions, PrResult, PrContext } from './types';

export async function upsertPr(context: PrContext, options: PrOptions): Promise<PrResult> {
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
  } else {
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
    } catch (e: any) {
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
async function pushBranch(branch: string, message: string, context: PrContext): Promise<boolean> {
    const remoteUrl = `https://x-access-token:${context.token}@github.com/${context.owner}/${context.repo}.git`;
    
    // We ignore error here in case standard setup already did it, but setting it ensures we use our token.
    // However, set-url might fail if origin doesn't exist? Standard actions setup usually has origin.
    try {
        await exec.exec('git', ['remote', 'set-url', 'origin', remoteUrl]);
    } catch (e) {
        console.warn('Failed to set remote URL, attempting to continue', e);
    }

    await exec.exec('git', ['checkout', '-B', branch]);
    await exec.exec('git', ['add', '.']);
    
    const statusOutput = await exec.getExecOutput('git', ['status', '--porcelain']);
    if (statusOutput.stdout.trim().length > 0) {
        await exec.exec('git', ['commit', '-m', message]);
        await exec.exec('git', ['push', '-f', 'origin', branch]);
        return true;
    } else {
        console.log('No file changes to commit');
        return false;
    }
}
