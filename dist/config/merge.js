"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfig = mergeConfig;
const schema_1 = require("./schema");
function mergeLayer(base, layer) {
    if (!layer)
        return base;
    return { ...base, ...layer };
}
function mergeConfig(defaults, fileConfig, inputConfig) {
    const normalizedFile = (0, schema_1.normalizeRawConfig)(fileConfig ?? {});
    const normalizedInputs = (0, schema_1.normalizeRawConfig)(inputConfig ?? {});
    const mergedRaw = mergeLayer(mergeLayer({ ...defaults }, normalizedFile.normalized), normalizedInputs.normalized);
    const validation = (0, schema_1.validateConfig)(mergedRaw);
    const warnings = [
        ...normalizedFile.warnings,
        ...normalizedInputs.warnings,
        ...validation.warnings,
    ];
    const unknownFields = [...normalizedFile.unknownFields, ...normalizedInputs.unknownFields];
    const redactedInputs = {
        defaults: (0, schema_1.redactConfig)(defaults),
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
