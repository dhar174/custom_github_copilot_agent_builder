"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRawConfig = normalizeRawConfig;
exports.validateConfig = validateConfig;
exports.redactConfig = redactConfig;
const DEFAULT_CONFIG = {
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
function normalizeKey(key) {
    const normalized = key.replace(/[-_\s]/g, '').toLowerCase();
    for (const candidate of KNOWN_KEYS) {
        const candidateNormalized = candidate.replace(/[-_\s]/g, '').toLowerCase();
        if (candidateNormalized === normalized) {
            return candidate;
        }
    }
    return undefined;
}
function redactValue(key, value) {
    if (typeof value === 'string' && SECRET_PATTERN.test(key)) {
        return '***';
    }
    return value;
}
function normalizeRawConfig(raw) {
    const normalized = {};
    const warnings = [];
    const unknownFields = [];
    const redacted = {};
    for (const [key, value] of Object.entries(raw)) {
        const mappedKey = normalizeKey(key);
        if (!mappedKey) {
            warnings.push({ code: 'UNKNOWN_FIELD', field: key });
            unknownFields.push(key);
            redacted[key] = redactValue(key, value);
            continue;
        }
        normalized[mappedKey] = value;
        redacted[mappedKey] = redactValue(mappedKey, value);
    }
    return { normalized, warnings, unknownFields, redacted };
}
function validateConfig(raw) {
    const errors = [];
    const warnings = [];
    const redacted = {};
    const unknownFields = [];
    const keys = Object.keys(raw ?? {});
    for (const key of keys) {
        const mappedKey = normalizeKey(key);
        if (!mappedKey) {
            warnings.push({ code: 'UNKNOWN_FIELD', field: key });
            unknownFields.push(key);
            redacted[key] = redactValue(key, raw[key]);
        }
    }
    const value = (key) => raw[key];
    const repo = value('repo');
    if (!repo || typeof repo !== 'string' || repo.trim().length === 0) {
        errors.push({ code: 'MISSING_FIELD', field: 'repo', message: 'repo is required' });
    }
    const packVersion = value('packVersion');
    const componentsRaw = value('components');
    let components;
    if (componentsRaw !== undefined) {
        if (Array.isArray(componentsRaw) && componentsRaw.every((c) => typeof c === 'string')) {
            components = componentsRaw;
        }
        else {
            errors.push({
                code: 'TYPE_MISMATCH',
                field: 'components',
                message: 'components must be an array of strings when provided',
            });
        }
    }
    const apply = value('apply');
    let applyFlag;
    if (apply !== undefined) {
        if (typeof apply === 'boolean') {
            applyFlag = apply;
        }
        else {
            errors.push({ code: 'TYPE_MISMATCH', field: 'apply', message: 'apply must be boolean' });
        }
    }
    const overrideToken = value('overrideToken');
    const permissionsModeRaw = value('permissionsMode');
    let permissionsMode;
    if (permissionsModeRaw !== undefined) {
        if (permissionsModeRaw === 'default' || permissionsModeRaw === 'cross-repo') {
            permissionsMode = permissionsModeRaw;
        }
        else {
            errors.push({
                code: 'TYPE_MISMATCH',
                field: 'permissionsMode',
                message: "permissionsMode must be 'default' or 'cross-repo'",
            });
        }
    }
    const strictRaw = value('strict');
    let strict = DEFAULT_CONFIG.strict;
    if (strictRaw !== undefined) {
        if (typeof strictRaw === 'boolean') {
            strict = strictRaw;
        }
        else {
            errors.push({ code: 'TYPE_MISMATCH', field: 'strict', message: 'strict must be boolean' });
        }
    }
    const configPath = value('configPath');
    if (errors.length > 0) {
        return { errors, warnings, redacted, unknownFields };
    }
    const config = {
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
function redactConfig(config) {
    const result = {};
    for (const [key, value] of Object.entries(config)) {
        result[key] = redactValue(key, value);
    }
    return result;
}
