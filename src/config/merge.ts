import { normalizeRawConfig, redactConfig, validateConfig, ValidConfig, ValidationResult } from './schema';

type MergeSource = Record<string, unknown> | undefined | null;

export interface MergeResult {
  config?: ValidConfig;
  errors: ValidationResult['errors'];
  warnings: ValidationResult['warnings'];
  unknownFields: string[];
  redactedInputs: Record<string, unknown>;
}

function mergeLayer(
  base: Record<string, unknown>,
  layer: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!layer) return base;
  return { ...base, ...layer };
}

export function mergeConfig(
  defaults: Record<string, unknown>,
  fileConfig: MergeSource,
  inputConfig: MergeSource,
): MergeResult {
  const normalizedFile = normalizeRawConfig(fileConfig ?? {});
  const normalizedInputs = normalizeRawConfig(inputConfig ?? {});

  const mergedRaw = mergeLayer(
    mergeLayer({ ...defaults }, normalizedFile.normalized as Record<string, unknown>),
    normalizedInputs.normalized as Record<string, unknown>,
  );

  const validation = validateConfig(mergedRaw);

  const warnings = [
    ...normalizedFile.warnings,
    ...normalizedInputs.warnings,
    ...validation.warnings,
  ];
  const unknownFields = [...normalizedFile.unknownFields, ...normalizedInputs.unknownFields];

  const redactedInputs = {
    defaults: redactConfig(defaults),
    file: normalizedFile.redacted,
    inputs: normalizedInputs.redacted,
  };

  return {
    config: validation.config,
    errors: validation.errors,
    warnings,
    unknownFields,
    redactedInputs,
  };
}
