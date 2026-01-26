export interface PackComponent {
  name: string;
  requires?: string[];
}

export interface PackManifest {
  components: PackComponent[];
}

export interface SelectionResult {
  resolved?: string[];
  errors: string[];
  warnings: string[];
  emptySelection: boolean;
}

export function validateSelection(manifest: PackManifest, selected: string[]): SelectionResult {
  if (!selected || selected.length === 0) {
    return {
      resolved: [],
      errors: [],
      warnings: ['No components selected; exiting gracefully.'],
      emptySelection: true,
    };
  }

  const componentMap = new Map<string, PackComponent>();
  for (const component of manifest.components) {
    componentMap.set(component.name, component);
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const resolvedSet = new Set<string>();
  const visiting = new Set<string>();

  function visit(name: string): void {
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
