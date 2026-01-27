import { ApplyChange } from '../apply/types';

export interface PrOptions {
  branch: string;
  title: string;
  body: string;
  base?: string;
  commitMessage: string;
}

export interface PrResult {
  prNumber: number;
  url: string;
  created: boolean;
  updated: boolean;
  sha?: string;
}

export interface PrContext {
  token: string;
  owner: string;
  repo: string;
}
