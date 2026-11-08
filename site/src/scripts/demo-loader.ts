// The demo bundle is built by scripts/build-demo.mjs. Importing it with ?url gives a hashed asset URL in production
// and a normal module URL in dev, so the dev server never treats it as a /public file.
import demoUrl from '../demo-dist/demo.js?url';
export const loadDemo = (): Promise<any> => import(/* @vite-ignore */ demoUrl);
