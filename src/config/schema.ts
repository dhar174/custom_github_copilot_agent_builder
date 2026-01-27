export type PermissionsMode = 'default' | 'cross-repo';

export interface RawConfig {
  repo?: unknown;
  packVersion?: unknown;
  components?: unknown;
  configPath?: unknown;
  apply?: unknown;
  overrideToken?: unknown;
  permissionsMode?: unknown;
  strict?: unknown;
}

export interface ValidationWarning {
  code: 'UNKNOWN_FIELD';
  field: string;
}

export interface ValidationError {
  code: 'MISSING_FIELD' | 'TYPE_MISMATCH';
  field: string;
  message: string;
}

export interface ValidConfig {
  repo: string;
  packVersion?: string;
  components: string[];
  configPath?: string;
  apply: boolean;
  overrideToken?: string;
  permissionsMode: PermissionsMode;
  strict: boolean;
}

const DEFAULT_CONFIG: Pick<ValidConfig, 'components' | 'apply' | 'permissionsMode' | 'strict'> = {
  components: [],
  apply: false,
  permissionsMode: 'default',
  strict: false,
};

const KNOWN_KEYS = [
  'repo',
  'packVersion',
  'components',
  'configPath',
  'apply',
  'overrideToken',
  'permissionsMode',
  'strict',
];

const SECRET_PATTERN = /(token|secret|key)/i;

export interface ValidationResult {
  config?: ValidConfig;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  redacted: Record<string, unknown>;
  unknownFields: string[];
}

function normalizeKey(key: string): string | undefined {
  const normalized = key.replace(/[-_\s]/g, '').toLowerCase();
  for (const candidate of KNOWN_KEYS) {
    const candidateNormalized = candidate.replace(/[-_\s]/g, '').toLowerCase();
    if (candidateNormalized === normalized) {
      return candidate as keyof ValidConfig;
    }
  }
  return undefined;
}

function redactValue(key: string, value: unknown): unknown {
  if (typeof value === 'string' && SECRET_PATTERN.test(key)) {
    return '***';
  }
  return value;
}

export function normalizeRawConfig(raw: Record<string, unknown>): {
  normalized: RawConfig;
  warnings: ValidationWarning[];
  unknownFields: string[];
  redacted: Record<string, unknown>;
} {
  const normalized: RawConfig = {};
  const warnings: ValidationWarning[] = [];
  const unknownFields: string[] = [];
  const redacted: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(raw)) {
    const mappedKey = normalizeKey(key);
    if (!mappedKey) {
      warnings.push({ code: 'UNKNOWN_FIELD', field: key });
      unknownFields.push(key);
      redacted[key] = redactValue(key, value);
      continue;
    }

    (normalized as Record<string, unknown>)[mappedKey] = value;
    redacted[mappedKey] = redactValue(mappedKey, value);
  }

  return { normalized, warnings, unknownFields, redacted };
}

export function validateConfig(raw: RawConfig): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const redacted: Record<string, unknown> = {};
  const unknownFields: string[] = [];

  const keys = Object.keys(raw ?? {});
  for (const key of keys) {
    const mappedKey = normalizeKey(key);
    if (!mappedKey) {
      warnings.push({ code: 'UNKNOWN_FIELD', field: key });
      unknownFields.push(key);
      redacted[key] = redactValue(key, (raw as Record<string, unknown>)[key]);
    }
  }

  const value = <T,>(key: keyof ValidConfig): T | undefined =>
    raw[key] as T | undefined;

  const repo = value<string>('repo');
  if (!repo || typeof repo !== 'string' || repo.trim().length === 0) {
    errors.push({ code: 'MISSING_FIELD', field: 'repo', message: 'repo is required' });
  }

  const packVersion = value<string>('packVersion');

  const componentsRaw = value<unknown>('components');
  let components: string[] | undefined;
  if (componentsRaw !== undefined) {
    if (Array.isArray(componentsRaw) && componentsRaw.every((c) => typeof c === 'string')) {
      components = componentsRaw;
    } else {
      errors.push({
        code: 'TYPE_MISMATCH',
        field: 'components',
        message: 'components must be an array of strings when provided',
      });
    }
  }

  const apply = value<unknown>('apply');
  let applyFlag: boolean | undefined;
  if (apply !== undefined) {
    if (typeof apply === 'boolean') {
      applyFlag = apply;
    } else {
      errors.push({ code: 'TYPE_MISMATCH', field: 'apply', message: 'apply must be boolean' });
    }
  }

  const overrideToken = value<string>('overrideToken');

  const permissionsModeRaw = value<unknown>('permissionsMode');
  let permissionsMode: PermissionsMode | undefined;
  if (permissionsModeRaw !== undefined) {
    if (permissionsModeRaw === 'default' || permissionsModeRaw === 'cross-repo') {
      permissionsMode = permissionsModeRaw;
    } else {
      errors.push({
        code: 'TYPE_MISMATCH',
        field: 'permissionsMode',
        message: "permissionsMode must be 'default' or 'cross-repo'",
      });
    }
  }

  const strictRaw = value<unknown>('strict');
  let strict = DEFAULT_CONFIG.strict;
  if (strictRaw !== undefined) {
    if (typeof strictRaw === 'boolean') {
      strict = strictRaw;
    } else {
      errors.push({ code: 'TYPE_MISMATCH', field: 'strict', message: 'strict must be boolean' });
    }
  }

  const configPath = value<string>('configPath');

  if (errors.length > 0) {
    return { errors, warnings, redacted, unknownFields };
  }

  const config: ValidConfig = {
    repo: repo ?? '',
    packVersion: packVersion || undefined,
    components: components ?? DEFAULT_CONFIG.components,
    configPath: configPath || undefined,
    apply: applyFlag ?? DEFAULT_CONFIG.apply,
    overrideToken: overrideToken || undefined,
    permissionsMode: permissionsMode ?? DEFAULT_CONFIG.permissionsMode,
    strict,
  };

  return { config, errors, warnings, redacted, unknownFields };
}

export function redactConfig(config: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    result[key] = redactValue(key, value);
  }
  return result;
}
