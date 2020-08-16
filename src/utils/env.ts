declare global {
  interface EnvVars {
    readonly ENV: string,
  }

  interface Window {
    __ENV: EnvVars;
  }
}
export const ENV_VARS: EnvVars = {
  get ENV(): string {
    return window.__ENV === undefined ? (process.env as any).ENV : window.__ENV.ENV
  },
}
