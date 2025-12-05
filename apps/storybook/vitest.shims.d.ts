import type { TestContext } from 'vitest';

declare module '@vitest/browser/context' {
  interface BrowserPage {
    context: TestContext;
  }
}
