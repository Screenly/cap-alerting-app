/**
 * Shared `mock.module` factory for `@screenly/edge-apps`.
 *
 * Bun's mock registry is process-global and last-write-wins, and it loads test
 * files in filesystem order. A factory that returns only the handful of
 * functions one test file cares about therefore hides the rest of the module
 * from every file loaded afterwards: `src/fetcher.ts` imports `getHardware`, so
 * once another file has registered a factory without it, importing the fetcher
 * fails to link with "Export named 'getHardware' not found".
 *
 * Building every factory on top of these defaults keeps the mocked module whole
 * whichever file happens to register last. Anything a module under `src/`
 * imports from `@screenly/edge-apps` belongs here.
 */

export const Hardware = {
  Anywhere: 'Anywhere',
  RaspberryPi: 'RaspberryPi',
  ScreenlyPlayerMax: 'ScreenlyPlayerMax',
  Unknown: 'Unknown',
} as const

export function edgeAppsMock(overrides: Record<string, unknown> = {}) {
  return (): Record<string, unknown> => ({
    Hardware,
    getCorsProxyUrl: () => '',
    getHardware: () => Hardware.Unknown,
    getMetadata: () => ({}),
    getSettings: () => ({}),
    getTags: () => [],
    isAnywhereScreen: () => false,
    setupTheme: () => {},
    signalReady: () => {},
    ...overrides,
  })
}
