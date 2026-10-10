declare const __ROFIT_VERSION__: string;
// The page generator runs in Node at build time; the repo has no @types/node, so declare the two calls it uses.
declare module 'node:fs' { export function readFileSync(path: string, encoding: 'utf8'): string; }
declare module 'node:path' { export function resolve(...parts: string[]): string; }
