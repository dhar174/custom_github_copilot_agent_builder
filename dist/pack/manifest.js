"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSelection = validateSelection;
function validateSelection(manifest, selected) {
    if (!selected || selected.length === 0) {
        return {
            resolved: [],
            errors: [],
            warnings: ['No components selected; exiting gracefully.'],
            emptySelection: true,
        };
    }
    const componentMap = new Map();
    for (const component of manifest.components) {
        componentMap.set(component.name, component);
    }
    const errors = [];
    const warnings = [];
    const resolvedSet = new Set();
    const visiting = new Set();
    function visit(name) {
        if (resolvedSet.has(name)) {
            return;
        }
        if (visiting.has(name)) {
            errors.push(`Circular dependency detected at ${name}`);
            return;
        }
        const component = componentMap.get(name);
        if (!component) {
            errors.push(`Unknown component: ${name}`);
            return;
        }
        visiting.add(name);
        for (const dep of component.requires ?? []) {
            visit(dep);
        }
        visiting.delete(name);
        resolvedSet.add(name);
    }
    for (const name of selected) {
        visit(name);
    }
    const resolved = Array.from(resolvedSet).sort();
    return {
        resolved,
        errors,
        warnings,
        emptySelection: false,
    };
}
