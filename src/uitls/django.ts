export function createVar(variable: string) {
  return `{{ ${variable} }}`;
}

export function createTag(tag: string, content: string = "") {
  return `{% ${tag} ${content} %}`;
}

export function createFilter(filter: string, content: string = "") {
  return `{{ ${content}|${filter} }}`;
}
