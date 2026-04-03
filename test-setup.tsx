import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('motion/react', async () => {
  const React = await import('react');

  return {
    // Replace motion.div, motion.button, etc.
    motion: new Proxy(
      {},
      {
        get: (_, element: string) =>
          React.forwardRef(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ({ children, ...props }: any, ref) =>
              React.createElement(element, { ref, ...props }, children)
          ),
      }
    ),

    // Disable AnimatePresence entirely
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});
