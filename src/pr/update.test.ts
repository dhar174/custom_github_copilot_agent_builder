import { beforeEach, describe, expect, it, vi } from 'vitest';
import { upsertPr } from './update';
import type { PrContext } from './types';

const listMock = vi.fn();
const createMock = vi.fn();
const updateMock = vi.fn();
const execMock = vi.fn();
const getExecOutputMock = vi.fn();

vi.mock('@actions/github', () => ({
  getOctokit: vi.fn(() => ({
    rest: {
      pulls: {
        list: listMock,
        create: createMock,
        update: updateMock,
      },
    },
  })),
}));

vi.mock('@actions/exec', () => ({
  exec: (...args: any[]) => execMock(...args),
  getExecOutput: (...args: any[]) => getExecOutputMock(...args),
}));

describe('upsertPr', () => {
  const context: PrContext = { token: 't', owner: 'owner', repo: 'repo' };

  beforeEach(() => {
    listMock.mockReset();
    createMock.mockReset();
    updateMock.mockReset();
    execMock.mockReset();
    getExecOutputMock.mockReset();

    // Default: there are changes to commit
    getExecOutputMock.mockResolvedValue({ stdout: 'M file', stderr: '', exitCode: 0 });
    execMock.mockResolvedValue(0);

    listMock.mockResolvedValue({ data: [] });
    createMock.mockResolvedValue({ data: { number: 42, html_url: 'http://example/pr/42' } });
    updateMock.mockResolvedValue({ data: {} });
  });

  it('updates an existing PR when branch changes and metadata differ', async () => {
    listMock.mockResolvedValue({
      data: [
        {
          number: 1,
          html_url: 'http://example/pr/1',
          title: 'old title',
          body: 'old body',
        },
      ],
    });

    const result = await upsertPr(context, {
      branch: 'agentops/test',
      title: 'new title',
      body: 'new body',
      commitMessage: 'chore: update',
    });

    expect(result).toEqual({ prNumber: 1, url: 'http://example/pr/1', created: false, updated: true });
    expect(updateMock).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 1,
      body: 'new body',
      title: 'new title',
    });
    expect(createMock).not.toHaveBeenCalled();

    const pushCall = execMock.mock.calls.find((call) => call[1]?.includes('--force'));
    expect(pushCall?.[1]).toContain('--force');
  });

  it('creates a new PR when branch is updated and no open PR exists', async () => {
    const result = await upsertPr(context, {
      branch: 'agentops/test',
      title: 'create title',
      body: 'create body',
      base: 'develop',
      commitMessage: 'chore: create',
    });

    expect(createMock).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      head: 'agentops/test',
      base: 'develop',
      title: 'create title',
      body: 'create body',
    });
    expect(result).toEqual({ prNumber: 42, url: 'http://example/pr/42', created: true, updated: false });
  });

  it('skips PR creation when there are no changes and no existing PR', async () => {
    getExecOutputMock.mockResolvedValue({ stdout: '', stderr: '', exitCode: 0 });

    const result = await upsertPr(context, {
      branch: 'agentops/test',
      title: 'noop',
      body: 'noop',
      commitMessage: 'noop',
    });

    expect(result).toEqual({ prNumber: 0, url: '', created: false, updated: false });
    expect(createMock).not.toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
  });
});
