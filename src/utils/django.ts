export function createVar(variable: string) {
  return `{{ ${variable} }}`;
}

export function createTag(tag: string, content: string = "") {
  return `{% ${tag} ${content} %}`;
}

export function createFilter(content: string, filter: string) {
  return `{{ ${content}|${filter} }}`;
}
